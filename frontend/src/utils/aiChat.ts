import type { DocglowData } from '../types'

export function isAiChatEnabled(data: DocglowData | null | undefined): boolean {
  return data?.metadata.ai_enabled === true
    || data?.metadata.features?.ai_chat === true
    || data?.ai_context != null
}
