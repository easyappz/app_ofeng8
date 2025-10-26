function formatError(err, extra = {}) {
  return {
    error: {
      message: err && err.message ? err.message : 'Unknown error',
      name: err && err.name ? err.name : 'Error',
      details: {
        ...extra,
        ...(err && err.errors ? { errors: err.errors } : {}),
        stack: err && err.stack ? err.stack : undefined
      }
    }
  };
}

module.exports = { formatError };
