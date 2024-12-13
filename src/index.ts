import fs from 'node:fs'
import path from 'node:path'
import type { ConfigEnv, Plugin, UserConfig } from 'vite'
import { parse as parseJson } from 'jsonc-parser'
import prompts, { type PromptObject } from 'prompts'

type Awaitable<T> = T | Promise<T>
type Answers<T, P> = { config?: AppConfigItem<P> } & T

interface VitePluginUniDeliveryOptions<
  T extends Record<string, any>,
  P,
  K extends keyof T = keyof T
> {
  appConfigPath?: string
  transformManifestJson?(json: any, answers: Answers<T, P>): void
  transformPagesJson?(json: any, answers: Answers<T, P>): void
  transformConfig?(
    viteConfig: UserConfig,
    answers: Answers<T, P>,
    env: ConfigEnv
  ): Awaitable<Omit<UserConfig, 'plugins'> | null | void>
  customPrompts?: PromptObject<K extends string ? K : string>[]
}

type AppConfigItem<T> = {
  name?: string
  appid: string
} & T

type AppConfig<T> = Record<string, AppConfigItem<T>[]>

export default function <
  T extends Record<string, any>,
  P extends Record<string, any> = Record<string, any>
>(options: VitePluginUniDeliveryOptions<T, P> = {}): Plugin {
  const appConfigPath = options.appConfigPath || path.join(process.cwd(), 'app-config.jsonc')
  const appPlatform = process.env.UNI_PLATFORM as string

  let answers: Answers<T, P>

  return {
    name: 'replace-manifest-json',
    enforce: 'pre',
    async config(config, env) {
      const appConfigJson = fs.readFileSync(appConfigPath, 'utf8')
      const appConfig: AppConfig<P> = parseJson(appConfigJson)
      const configList = appConfig[appPlatform]
      const questions: PromptObject[] = []

      if (configList) {
        const choices = configList.map((item) => ({
          title: item.name || item.appid,
          description: item.appid,
          value: item,
        }))
        questions.push({
          type: 'select',
          name: 'config',
          message: 'please choose an app',
          choices,
          initial: 1,
        })
      }

      if (options.customPrompts) {
        questions.push(...options.customPrompts)
      }

      answers = (await prompts(questions)) as Answers<T, P>

      if (options.transformConfig) {
        return options.transformConfig(config, answers, env)
      }
    },
    transform(code, id) {
      if (id.endsWith('manifest-json-js')) {
        if (!answers.config && !options.transformManifestJson) {
          return
        }
        const json = parseJson(code)
        if (answers.config) {
          json[appPlatform].appid = answers.config.appid
          if (answers.config.name) {
            json.name = answers.config.name
          }
        }
        if (options.transformManifestJson) {
          options.transformManifestJson(json, answers)
        }
        return {
          code: JSON.stringify(json),
          map: null,
        }
      }
      if (id.endsWith('pages-json-js')) {
        const json = parseJson(code)
        if (answers.config?.name && json.globalStyle?.navigationBarTitleText) {
          json.globalStyle.navigationBarTitleText = answers.config?.name
        }
        if (options.transformPagesJson) {
          options.transformPagesJson(json, answers)
        }
        return {
          code: JSON.stringify(json),
          map: null,
        }
      }
    },
  }
}
