console.log("minisocial started!");

// TODOs del minisocial
// 1. TODO fare un frontend che mostri sempre due cose: 1 form di inserimento di un pensiero (1 testo) e una lista dei pensieri precedentemente inseriti (in ordine INVERSO di inserimento)
// 2. TODO fare un backend che implementi le seguenti operazioni:
// 3. TODO list (dei pensieri)
// 4. TODO create pensiero
// 5. TODO delete pensiero
// 6. TODO mostrare un gradimento (numero) del pensiero
// 7. TODO gestire l'aggiunta di un +1 al gradimento di un pensiero
// 8. TODO gestire un selettore di cambio ordinamento lista che consente di mostrare la list in due modi (ordine temporale INVERSO oppure GRADIMENTO DISCENDENTE)

app.get('/create', (req, res) => {

    let robj = {
          "result":0,
          "message":"thought successfully created",
          "data":[]
      };
      
      try{
  
          if(typeof req.query.title === 'undefined' || req.query.title =='') throw('title parameter required in GET');
          if(typeof req.query.author === 'undefined' || req.query.author =='') throw('author parameter required in GET');
          if(typeof req.query.composer === 'undefined' || req.query.composer =='') throw('composer parameter required in GET');
  
          const d = new Date();
          let time = d.getTime();
  
          let s = fs.readFileSync('songs.json', 'utf8');
          let sobj = JSON.parse(s);
          sobj.data.push(
              {
                  id: time,
                  title: req.query.title,
                  author: req.query.author,
                  composer: req.query.composer
              }
          );
          let new_s = JSON.stringify(sobj);
          fs.writeFileSync('songs.json', new_s, 'utf8');
          
      } catch(err){
          robj.result = 2000;
          robj.message = err.toString();
      }
      let s= JSON.stringify(robj);
      res.send(s);
  });
  
  app.get('/delete', (req, res) => {
    
      let robj = {
          "result":0,
          "message":"song successfully deleted",
          "data":[]
      };
      
      try{
  
          if(typeof req.query.id === 'undefined' || req.query.id =='') throw('id parameter required in GET');
  
          let s = fs.readFileSync('songs.json', 'utf8');
          let sobj = JSON.parse(s);
          let found = false;
          for(li=0; li<sobj.length; li++){
              if(sobj[li].id == req.query.id){
                  // trovato cancello ed esco
                  sobj.splice(li,1);
                  found = true;
                  break;
              }
          }
          if(!found) throw('song to delete not found');
  
          let new_s = JSON.stringify(sobj);
          fs.writeFileSync('songs.json', new_s, 'utf8');
          
      } catch(err){
          robj.result = 3000;
          robj.message = err.toString();
      }
      let s= JSON.stringify(robj);
      res.send(s);
  });
  

  app.get('/list', (req, res) => {

	let robj = {
		"result":0,
		"message":'thought_data_db.json', 'UTF8',
		"data":[]
	};
	
	try{
		let s = fs.readFileSync('songs.json', 'utf8');
		robj.data = JSON.parse(s);
		
	} catch(err){
		robj.result = 1000;
		robj.message = err.toString();
	}
	let s= JSON.stringify(robj);
	res.send(s);

});
