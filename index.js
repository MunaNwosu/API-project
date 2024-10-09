import express from "express";
import axios from "axios";
import bodyParser from "body-parser";


const app = express();
const port = 3001;
const API_URL = "https://api.balldontlie.io/v1/players?";
const api_key = "";


app.use(bodyParser.urlencoded({ extended: true }));


app.get("/",(req,res) =>{
  res.render("index.ejs");
});

app.post("/info", async(req,res) =>{
  const firstname = req.body["fName"];
  const lastname = req.body["lName"];
  try {
    const response = await axios.get(`${API_URL}filter`,{
      headers:{
        Authorization: api_key
      },
      params:{search:firstname}
    });

    const result = response.data;
    const player = findplayer(result,lastname)
    console.log(player["last_name"]);
    res.render("index.ejs", { player_info: player });
  
  } catch (error) {
    console.error("Failed to make request:", error.message);
    res.render("index.ejs", {
      error: error.message,
    });
  }
});

  app.listen(port, () => {
    console.log(`Server running on port ${port}`);
  });

  function findplayer(result,lastname){
    
    var player_count = 0;
    
    while(player_count<result["data"].length){
      for(const[key, value] of Object.entries(result["data"][player_count]))

        if(result["data"][player_count]["last_name"] == lastname){
          console.log(result["data"][player_count]);
    
          return result["data"][player_count];
        }
        //console.log(`${key}: ${value}`);
  
      player_count++;
    }
  }