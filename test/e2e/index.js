const testModes = require('./testModes.js')
const [,, ...args] = process.argv

start(args)

function start (modes) {
  let results = []

  if (modes.length) {
    results = runTests(modes)
  } else {
    results = runAllTests()
  }

  if (results.length) {
    printTotalResults(results)
  }
}

function runTests (modes) {
  const results = []

  console.log(`Run geohex e2e tests: ${modes.join(', ')}`)

  modes.forEach((name) => {
    const mode = testModes.find(
      (mode) => mode.name === name
    )

    if (!mode) {
      console.log(`Test mode "${name}" not found`)
      console.log(`Available modes: ${testModes.map(mode => mode.name).join(', ')}`)
    } else {
      results.push(runTest(mode))
    }
  })

  return results
}

function runAllTests () {
  console.log('Run all geohex e2e tests')

  return testModes.map((mode) => runTest(mode))
}

function runTest (mode) {
  const testDataFile = 'hex_v3.2_test_' + mode.name + '.json'
  const testData = require('./data/' + testDataFile)
  const testLogic = mode.logic
  let failedTestsCount = 0

  testData.forEach((line) => {
    const result = testLogic(line)
    const resultPrefix = result.err ? '[NG]' : '[OK]'

    console.log(`${resultPrefix} ${result.message}`)

    failedTestsCount += result.err
  })

  return {
    mode,
    testDataFile,
    testDataLength: testData.length,
    failedTestsCount
  }
}

function printTestResult ({
  mode,
  testDataFile,
  testDataLength,
  failedTestsCount
}) {
  console.log()
  console.log(`Test mode: ${mode.mode}`)
  console.log(`Input: ${mode.input}`)
  console.log(`Output: ${mode.output}`)
  console.log(`Data file: ${testDataFile}`)
  console.log(`Data count: ${testDataLength}`)
  console.log(`Failed tests: ${failedTestsCount}`)
}

function printTotalResults (results = []) {
  let totalFailedTestsCount = 0

  results.forEach((modeResult) => {
    if (modeResult) {
      totalFailedTestsCount += modeResult.failedTestsCount
      printTestResult(modeResult)
    }
  })

  console.log()
  console.log('Total test modes:', results.length)
  console.log(`Total failed tests: ${totalFailedTestsCount}`)
}
