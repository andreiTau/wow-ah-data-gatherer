export const get_items =  () => {

  const items = {}

  const tables = document.getElementsByClassName("category category-items")

  for(let i=0;i< tables.length;i++) {
    const table = tables[i]
    //@ts-ignore
    let tableName = table.children[0].children[0].innerText.slice(0,-4)
    const rows = table.children
    if(items.hasOwnProperty(tableName)) {
      tableName = tableName + "1"
    }
    items[tableName] = {}
    for(let j=3; j<rows.length;j++) {
      const row = rows[j]
      const values = row.children
      //@ts-ignore
      const name = values[1].innerText.slice(1,-1).toString()
      //@ts-ignore
      const currentPrice = parseFloat(values[3].innerText)
      //@ts-ignore
      const lastSeen = values[5].innerText
      
      items[tableName][name] = {currentPrice,lastSeen}
    }
  }


  return items;
};
