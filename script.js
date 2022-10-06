const input = document.querySelector(`.amount1`)
const currency1 = document.querySelector(`#currency1`)
const result = document.querySelector(`.amount2`)
const currency2 = document.querySelector(`#currency2`)
const swapBtn = document.querySelector(`.swap`)
const rateInfo = document.querySelector(`.rate-info`)
let currencyValue

const calcRate = () => {
	fetch(`https://api.exchangerate.host/latest?base=${currency1.value}&symbols=${currency2.value}`)
		.then(res => res.json())
		.then(data => {
			const currencyOne = currency1.value
			const currencyTwo = currency2.value
			const rate = data.rates[currencyTwo]
			rateInfo.textContent = `1 ${currencyOne} = ${rate.toFixed(4)} ${currencyTwo}`
			result.value = (input.value * rate).toFixed(2)
		})
}

const swap = () => {
	currencyValue = currency1.value
	currency1.value = currency2.value
	currency2.value = currencyValue
	calcRate()
}
currency1.addEventListener(`change`, calcRate)
currency2.addEventListener(`change`, calcRate)
input.addEventListener(`input`, calcRate)
window.addEventListener(`DOMContentLoaded`, calcRate)
swapBtn.addEventListener(`click`, swap)
