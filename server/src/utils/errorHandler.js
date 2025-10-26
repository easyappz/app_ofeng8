function formatError(err) {
  return {
    error: {
      message: err?.message || 'Internal server error',
      details: {
        name: err?.name || 'Error',
        stack: err?.stack || null,
      },
    },
  };
}

module.exports = { formatError };
