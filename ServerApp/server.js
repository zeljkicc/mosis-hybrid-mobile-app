var listaKorisnika = new Array();

var i =0;

var mongo = require('mongodb').MongoClient, //ucitava mognodb driver
    io = require('socket.io').listen(8080).sockets; //ucitava klijenta za sockete, i namesta da slusa na portu 8000
 
    //mongo.connect('mongodb://127.0.0.1/saobracaj', function(err,db){
	mongo.connect('mongodb://user:user@ds017672.mlab.com:17672/saobracaj', function(err,db){
        if(err) throw err;
 
          io.on('connection',function(socket){
		  
		  //logovanje kad se klijent konektovao, diskonektovao
		  console.log('a user connected ' + socket.id);
		  
			socket.on('disconnect', function(){
			console.log('user disconnected' + socket.id);
			});

			
            
			
		
			//cekanje na registraciju
			 socket.on('register', function(data){
                 	//uzimanje tabele za korisnike
			var colKorisnici = db.collection('korisnici');
       	 
					 console.log("Dovde smo dosli" + data.ime);
					 
					 var cursor =db.collection('korisnici').find( { "email": data.email } );
					 
					 cursor.toArray(function(err, items) {
					 
					 socket.join(data.email);
					 
					if(items.length > 0){
					console.log("Postoji korisnik u bazi");
					io.to(data.email).emit('register1', {status: "neuspeh"});
					//io.emit('register1', {poruka: 'Neuspela registracija. Pokusajte ponovo!'});
					socket.leave(data.email);
					}		
					 else{					                   
                    
                    colKorisnici.insert(data, function(err){
						console.log("Uspesno dodat korisnik u bazu" + " " + data.ime + " " + err);
						
						if(!err){
						io.to(data.email).emit('register1', {status: 'uspeh'});
						//io.emit('register1', {poruka: 'Uspesno ste se registrovali'});
						}
						else{
						io.to(data.email).emit('register1', {poruka: 'Neuspela registracija. Pokusajte ponovo!'});
						socket.leave(data.email);
						}
			
                    });
					
					
					}//end else
					});
                });
				
				
				//cekanje na login
				socket.on('login', function(data){
             	//uzimanje tabele za korisnike
			var colKorisnici = db.collection('korisnici');	 
					 console.log("Dovde smo dosli login " + data.long);
					 
					 var cursor =db.collection('korisnici').find( {$and : [ { "email": data.email },{ "sifra":data.sifra } ] });
					 
					 cursor.toArray(function(err, items) {
					// console.log("Provera pre " + items[0].email + "lat " + items[0].lat)
					 socket.join(data.email);
                     
					 
					if(items.length > 0){
                        
                    //smestamo u listu korisnika novog korisnika
                   console.log("Dodat u listu trenutnih korisnika " + items[0].email + "lat " + items[0].long);
                    listaKorisnika.push(data);
					console.log("Postoji korisnik u bazi, emitovanje uspesnog logina ka" + data.email);
					io.to(data.email).emit('uspesanLogin', {provera : "uspeh"} );
					//io.emit('register1', {poruka: 'Neuspela registracija. Pokusajte ponovo!'});
					//socket.leave(data.email);
                    //var dogadjaji = new Array();
                     var dogadjaji = vratiSadrzajZaPrikaz(data);
                   // console.log("Provera " + JSON.stringify(dogadjaji));
                   // io.to(data.email).emit('iscrtajMapu', JSON.stringify(dogadjaji));
                    
					}		
					 else{					                   
                    
                   io.to(data.email).emit('uspesanLogin', {provera : "neuspeh"});
			
                  // socket.leave(data.email);
					
					
					}//end else
					});
                    
                    //
                    
                    
                });
                
                
                
                //cekanje na update
				socket.on('update', function(data){
                        
                     console.log("Provera updatea - korisnik : " + JSON.stringify(data));
                     var dogadjaji = vratiSadrzajZaPrikaz(data);
                   //
                    //console.log("Na serveur" + JSON.stringify(dogadjaji));
                    //io.to(data.email).emit('sadrzajZaPrikaz', JSON.stringify(dogadjaji));
                    

					});
                    
                    //
                    
                    
            
                
                
                
                //cekanje na logout
				socket.on('logout', function(data){
           
					 console.log("Dovde smo dosli logout " + data.email);	
                     
                     
					 
				
                     
                     var flag = 0;
                     console.log("Duzina" + listaKorisnika.length);
                     for(var i =0; i<listaKorisnika.length; i++){
                         console.log("Prolazak krozi niz " + i + " " + listaKorisnika[i].email);	
                         if(listaKorisnika[i].email == data.email){
                         listaKorisnika.splice(i, 1);
                         console.log("Nakon izbacivanja duzina" + listaKorisnika.length);                         
                         flag = 1;
                         
                         }
						 break;
                     }
					console.log("Postoji korisnik u bazi");
                    
                    if(flag == 1){
					console.log("Saljem ka " + data.email);
					io.to(data.email).emit('uspesanLogout', {status: 'uspeh'});
					socket.leave(data.email);
                    }else{
					console.log("Ne saljem ka " + data.email);
                        io.to(data.email).emit('uspesanLogout', {status: 'neuspeh'});
                    }
						
				
                });
                
                
                //cekanje na dodaj novi objekat
				socket.on('addNewObject', function(data){            
                    
                    	//uzimanje tabele za korisnike
			        var colDogadjajiNaPutu = db.collection('dogadjaji_na_putu');
            
                    
                    colDogadjajiNaPutu.insert(data, function(err){
					
						
						if(!err){
                        //console.log("Uspesno dodat dogadjaj u bazu" + " " + data.dogadjaj + " " + err);
						//io.to(data.email).emit('successAddNO', JSON.stringify(data));
						console.log("Emitovanje notifikacije" + i++ + " " + "ka" + data.email);
                        io.emit("notification", JSON.stringify(data));
                        //io.to(data.email).emit('notification', JSON.stringify(data));
                        io.to(data.email).emit('successAddNO', {status : 'uspeh'});
						}
						else{
						io.to(data.email).emit('successAddNO', {status : 'greska'});
						//socket.leave(data.email);
                        
                        
						}
			
                    });
					 
			
					});
                    
                    
                    
                    //get Objects
				socket.on('getObjects', function(data){            
                    console.log("Stigli smo dovde :D 1");
                    	//uzimanje tabele za dogadjaje
			        var colDogadjajiNaPutu = db.collection('dogadjaji_na_putu');
            
                    
                   var cursor =db.collection('dogadjaji_na_putu').find();
					 
					 cursor.toArray(function(err, items) {
					 
					 //socket.join(data.email);
					 
					if(items.length > 0){
					console.log("Stigli smo dovde :D 2");
                    //console.log(JSON.stringify(items));
					io.to(data.email).emit('getObjectsSucc', JSON.stringify(items));
					//io.emit('register1', {poruka: 'Neuspela registracija. Pokusajte ponovo!'});
					//socket.leave(data.email);
					}		
					 else{					                   
                    
                   io.to(data.email).emit('getObjectsSucc', {poruka: 'Neuspeh!'});
			
                 //  socket.leave(data.email);
					
					
					}//end else
					});
					 
			
					});
                });
                
                
                
                
                
                	
			function vratiSadrzajZaPrikaz(data){
                
                var colDogadjajiNaPutu = db.collection('dogadjaji_na_putu');
               // var cursor =db.collection('dogadjaji_na_putu').find();
                
                var cursor = colDogadjajiNaPutu.find( { loc: { $geoWithin: { $centerSphere: [ [ data.long, data.lat ] ,
                                                     data.radius / 6378.15214 ] } } } )    
                                                     
                var dog;                                     
                cursor.toArray(function(err, items) {
					//console.log("provera korisnika " + listaKorisnika.length);
					if(items != undefined){
					if(items.length > 0){
                        
                        for(var i = 0; i<listaKorisnika.length; i++){
                            items.push(listaKorisnika[i]);
                        }
                       //console.log("Na serveru za klijenta " + data.email + JSON.stringify(items)); 
                       
                       console.log("Vracanje updeta ka" + data.email);
                       io.to(data.email).emit('sadrzajZaPrikaz', JSON.stringify(items));
                      // io.in(data.email).emit('sadrzajZaPrikaz', JSON.stringify(items));
					}		
					 else{					                   

			           return null;				
					
					}//end else
					}
					});
                                                               
            }
                
                
 
            });
			
		
            
       
    