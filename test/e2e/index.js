const testModes = require('./testModes.js')
const [,, ...args] = process.argv
const VERBOSE_MODE = args.includes('--verbose')

start(args)

function start (args) {
  const modes = testModes.filter(
    ({ name }) => args.includes(name)
  )
  let results = []

  if (modes.length) {
    results = runTests(modes)
  } else {
    results = runTests(testModes)
  }

  if (results.length) {
    printTotalResults(results)
  }
}

function runTests (modes) {
  const results = []

  console.log(`Run geohex e2e tests in modes: ${modes.map(({ name }) => name).join(', ')}`)

  modes.forEach((mode) => {
    results.push(runTest(mode))
  })

  return results
}

function runTest (mode) {
  const testDataFile = 'hex_v3.2_test_' + mode.name + '.json'
  const testData = require('./data/' + testDataFile)
  const testLogic = mode.logic
  let failedTestsCount = 0

  testData.forEach((line) => {
    const result = testLogic(line)

    if (VERBOSE_MODE) {
      console.log(`${result.err ? '[ERROR]' : '[OK]'} ${result.message}`)
    }

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
  const failedModes = []
  const successModes = []
  let totalFailedTestsCount = 0

  results.forEach((modeResult) => {
    if (modeResult) {
      if (modeResult.failedTestsCount > 0) {
        failedModes.push(modeResult.mode.name)
        totalFailedTestsCount += modeResult.failedTestsCount
      } else {
        successModes.push(modeResult.mode.name)
      }

      if (VERBOSE_MODE) {
        printTestResult(modeResult)
      }
    }
  })

  console.log()
  console.log(`Success test modes: [${successModes.join(', ')}]`)
  console.log(`Failed test modes: [${failedModes.join(', ')}]`)
  console.log(`Total failed tests: ${totalFailedTestsCount}`)
}
