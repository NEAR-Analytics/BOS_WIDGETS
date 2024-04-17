console.log('hahah')

return  <div onClick={() => {
    Storage.set('abc', Date.now())
}}>{ Storage.get('abc') } 3333</div>