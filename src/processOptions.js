import path from 'path';

const DEFAULT_FILENAME = 'index.html';
const DEFAULT_EVENT_HOOK = 'done';

const processOptions = compiler => (options, replacements) => {
  if (!Array.isArray(replacements)) {
    throw new Error('replacements must be an array');
  }

  let { filename } = options;
  if (!filename) {
    filename = path.join(compiler.output.path, DEFAULT_FILENAME);
  }
  if (!path.isAbsolute(filename)) {
    filename = path.join(compiler.context, filename);
  }

  const eventHook = options.event || DEFAULT_EVENT_HOOK;

  if (['done', 'compile', 'emit'].indexOf(eventHook) === -1) {
    throw new Error('event must be one of done|compile|emit');
  }

  return {
    filename,
    eventHook,
    replacements,
  };
};

export default processOptions;