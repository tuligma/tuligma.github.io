const getPuzzle = async (wordCount) => {
    const response = await fetch(`https://puzzle.mead.io/puzzle?wordCount=${wordCount}`)

    if (response.status === 200) {
        const data = await response.json()
        return data.puzzle
    } else {
        throw new Error('Unable to get puzzle.')
    }
}

// Create a new function called getCurrentCountry
// Should return a promise that resolves the country Object for your current location
// Use async/await for the new function

const getCurrentCountry = async () => {
    const countryCode = await getLocation()
    const currentCountry = await getCountry(countryCode.country)
    return currentCountry
}


const getCountry = async (countryCode) => {

    const response = await fetch('https://restcountries.com/v3.1/all')
    if (response.status === 200) {
        const country =  await response.json()
        return country.find((country) => country.cca2 === countryCode)
    } else {
        throw new Error(`Unable to fetch the country "${countryCode}"`)
    }
}

const getLocation = async () => {
    const response = await fetch('https://ipinfo.io/json?token=99a800282f1305')
    if (response.status === 200) {
        return response.json()
    } else {
     throw new Error('Unable to fetch the location')
    }
}

