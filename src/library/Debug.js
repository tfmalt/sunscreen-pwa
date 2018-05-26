
const debug = {
  log: function() {
    if (process.env.NODE_ENV === "development") {
      console.log.apply(console, arguments)
    }
  }
}

export default debug