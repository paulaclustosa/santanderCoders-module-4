const createCalculator = (() => {

  const calculatorBox = document.querySelector('.calc_box')
  const section = document.querySelector('section')
  const OPEN_CLASS = '--is-opened'
  const CLOSE_CLASS = '--is-closed'

  const open = () => {
    calculatorBox.classList.add(OPEN_CLASS)
    section.classList.add(CLOSE_CLASS)
  }

  let previousOperand = undefined;
  let currentOperand = [];
  let operator = [];

  let operation = {
    previousOperand: previousOperand,
    currentOperand: currentOperand,
    operator: operator[0],
  }

  const currentOperandDisplay = document.querySelector('div[name="current_operand"]')

  const _setCurrentOperand = (operandButton) => {
    currentOperand = [...currentOperand, operandButton.innerText]
  }

  const updateCurrentOperandDisplay = (operandButton) => {
    _setCurrentOperand(operandButton)
    currentOperandDisplay.innerText = currentOperand.join('')
  }

  const handleCalc = (operatorButton) => {
    _setOperator(operatorButton)
    _setOperation()
    _partialCompute()
  }

  const _setOperator = (operatorButton) => {
    operator = [...operator, operatorButton.innerText]
  }

  const _setOperation = () => {
    operation = {
      previousOperand: previousOperand,
      currentOperand: currentOperand,
      operator: operator[0],
    }
  }

  const _partialCompute = () => {

    let result = 0;

    if (previousOperand === undefined) {
      result = Number(operation.currentOperand.join(''))
      _updatePreviousOperandDisplay(result)
    }

    else {
      switch (operation.operator) {
        case '+':
          result = Number(operation.previousOperand.join('')) + Number(operation.currentOperand.join(''))
          break;
        case '-':
          result = Number(operation.previousOperand.join('')) - Number(operation.currentOperand.join(''))
          break;
        case 'x':
          result = Number(operation.previousOperand.join('')) * Number(operation.currentOperand.join(''))
          break;
        case '÷':
          result = Number(operation.previousOperand.join('')) / Number(operation.currentOperand.join(''))
          break;
        default:
          break;
      }
      _updateOperator()
      _updatePreviousOperandDisplay(result)
    }

    _setPreviousOperand(result)
    _clearCurrentOperand()
    _clearCurrentOperandDisplay()
  }

  const previousOperandDisplay = document.querySelector('div[name="previous_operand"]')

  const _updatePreviousOperandDisplay = (result) => {
    previousOperandDisplay.innerText = `${result} ${operator[0]}`
  }

  const _updateOperator = () => {
    operator = operator.slice(1)
  }

  const _setPreviousOperand = (result) => {
    previousOperand = result.toString().split('')
  }

  const _clearCurrentOperand = () => {
    currentOperand = []
  }

  const _clearCurrentOperandDisplay = () => {
    currentOperandDisplay.innerText = ''
  }

  const undo = () => {
    currentOperand = currentOperand.slice(0, -1)
    currentOperandDisplay.innerText = currentOperand.join('')
  }

  const clear = () => {
    previousOperand = undefined;
    operator = [];
    currentOperand = [];
    _clearCurrentOperandDisplay()
    _clearPreviousOperandDisplay()
  }

  const _clearPreviousOperandDisplay = () => {
    previousOperandDisplay.innerText = ''
  }

  const equals = () => {
    _setOperation()
    _compute()
  }

  const _compute = () => {

    let result = 0;

    if (previousOperand === undefined) {
      clear()
    }

    else {
      switch (operation.operator) {
        case '+':
          result = Number(operation.previousOperand.join('')) + Number(operation.currentOperand.join(''))
          break;
        case '-':
          result = Number(operation.previousOperand.join('')) - Number(operation.currentOperand.join(''))
          break;
        case 'x':
          result = Number(operation.previousOperand.join('')) * Number(operation.currentOperand.join(''))
          break;
        case '÷':
          result = Number(operation.previousOperand.join('')) / Number(operation.currentOperand.join(''))
          break;
        default:
          break;
      }

      _updateOperator()
      _updateCurrentOperand(result)
      currentOperandDisplay.innerText = result
      _setPreviousOperandToUndefined()
      _clearPreviousOperandDisplay()
    }
  }

  const _setPreviousOperandToUndefined = () => {
    previousOperand = undefined;
  }

  const _updateCurrentOperand = (result) => {
    currentOperand = result.toString().split('')
  }

  return {
    open,
    updateCurrentOperandDisplay,
    handleCalc,
    undo,
    clear,
    equals,
  }
})()

const buttonOpenCalculator = document.querySelector('button[name="open_calc"]')

buttonOpenCalculator.addEventListener('click', () => createCalculator.open())

const operandsButtons = document.querySelectorAll('button[name="operand"]')

operandsButtons.forEach(button => {
  button.addEventListener('click', (event) => {
    createCalculator.updateCurrentOperandDisplay(event.target)
  })
})

const operatorsButtons = document.querySelectorAll('button[name="operator"]')

operatorsButtons.forEach(button => {
  button.addEventListener('click', (event) => {
    createCalculator.handleCalc(event.target)
  })
})

const undoButton = document.querySelector('button[name="undo"]')

undoButton.addEventListener('click', () => createCalculator.undo())

const clearButton = document.querySelector('button[name="clear"]')

clearButton.addEventListener('click', () => createCalculator.clear())

const equalsButton = document.querySelector('button[name="equals"]')

equalsButton.addEventListener('click', () => createCalculator.equals())
