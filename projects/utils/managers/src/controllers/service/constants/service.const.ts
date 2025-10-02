import { ActionsManager } from '../managers/actions/manager/actions.manager';
import { DetectManager } from '../managers/detect/manager/detect.manager';
import { ErrorManager } from '../managers/error/manager/error.manager';
import { StreamsManager } from '../managers/streams/manager/streams.manager';
import { UnsubscribeManager } from '../managers/unsubscribe/manager/unsubscribe.manager';

export const SERVICE_MANAGERS_MAP = {
  unsubscribe: UnsubscribeManager,
  actions: ActionsManager,
  error: ErrorManager,
  detect: DetectManager,
  streams: StreamsManager,
} as const;

export const FULL_MANAGERS: ReadonlyArray<keyof typeof SERVICE_MANAGERS_MAP> = [
  'actions',
  'detect',
  'error',
  'streams',
  'unsubscribe',
] as const;
