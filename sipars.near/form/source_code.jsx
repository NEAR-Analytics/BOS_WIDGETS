let greeting = 'Hello World'
State.init({
  data: { name: 'Parshant', email: '', issuer: 'initial' },
})

let data = {
  name: 'Parshant',
  email: 'test@example.com',
  did: '0x123456789987654321',
}
const fetchCred = () => {
  return asyncFetch(
    'https://9fe7-2a00-20-d049-b8aa-bdb9-9afa-8dfa-fa90.eu.ngrok.io/api/issue',
    {
      body: JSON.stringify(data),
      headers: {
        'Content-Type': 'application/json',
      },
      method: 'POST',
      mode: 'no-cors',
    },
  )
}

// const computeResults = (term) => {
//   console.log('computeResults:', term)
//   fetchAlgoliaData().then((res) => {
//     State.update({
//       data: res.body,
//     })
//   })
// }

// const fetchAlgoliaData = () => {
//   return asyncFetch(
//     'https://9fe7-2a00-20-d049-b8aa-bdb9-9afa-8dfa-fa90.eu.ngrok.io/api/issue',
//     {
//       body: JSON.stringify(data),
//       headers: {
//         'Content-Type': 'application/json',
//       },
//       method: 'POST',
//     },
//   )
// }

const compute = () => {
  fetchCred().then((res) => {
    console.log(res)
    State.update({
      data: res,
    })
  })
}

return (
  <div onLoad={compute}>
    <h1>Hello</h1>
    {JSON.stringify(state.data)}
    <p>{state.data.cred.issuer}</p>
  </div>
)
