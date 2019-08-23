const express = require('express')

const getRandomInt = max => {
    return Math.floor(Math.random() * Math.floor(max));
}

const PORT = process.env.PORT || 5000

const app = express()

app.post('/', (req, res) => {
    console.log('Order received.')
    const sleepTime = getRandomInt(5000)

    setTimeout(() => {
        const randomInt = getRandomInt(10)

        // Fail with .2 probability
        if (randomInt < 8) {
            console.log('Success!')
            res.status(200).send()
        } else {
            console.log('An error occured.')
            res.status(500).send()
        }
    }, sleepTime)


})

app.listen(PORT, () => console.log(`Call center listening port ${PORT}...`))
