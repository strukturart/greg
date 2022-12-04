self.onsystemmessage = (e) => {
  console.log("receive systemmessage event on sw.js!");
  console.log(e.data.json()); 
};
