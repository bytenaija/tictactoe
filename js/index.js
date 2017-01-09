$(document).ready(function() {
  var board=["0", "1", "2", "3", "4", "5", "6", "7", "8"];
  var board_temp=[];
  var board_test=[];
  var position;
  // var buttonID;
  var round=0;
  var turnSet=true; // Computer turn True = Crosses & False = noughts
  var turn=true; // True = Crosses & False = noughts
  var win=false;
  var nought = 0; // nought win amount
  var cross = 0; // cross win amount
  var computer = true; //Computer playz
  var bestValue;
  var bestMove;
  var moveValue;
  // var counter = 0;
  var corners=[0,2,6,8];
  
  if (turnSet){
      computerPlay();
    }
  
  // Computer player - algorithm
  function computerPlay(){
    // var temp_i;
    board_test=[];
    board_temp=board.slice();
    bestValue=-1000;
    bestMove=-1;
    moveValue=0; // Check this
    
    if (round===0){
      position=corners[Math.floor(Math.random() * 4)];
    }else{
      if(turnSet){
        getValueX(board_temp);
      }else{
        getValueO(board_temp);
      }
    }
    updateTurn();
  }
  
 function getValueX(boardState){
   
   boardState.forEach(function(element, index) {
      if(element!="o"&&element!="x"){
        boardState[index]="x";
                
        // Empty edge
        if (index==1||index==3||index==5||index==7){
          moveValue=1;
          }
        
        // Empty corner
        if (index===0||index==2||index==6||index==8){
          moveValue=2;
          }
        
        // Empty opposite corner
        if (index===0&&boardState[8]=="x"){
          moveValue=3;
          }
        if(index==2&&boardState[6]=="x"){
          moveValue=3;
          }
        if(index==6&&boardState[2]=="x"){
          moveValue=3;
          }
        if(index==8&&boardState[0]=="x"){
          moveValue=3;
          }
        
        // Center
        if(index==4){
          moveValue=5;
        }
               
        // Block fork opportunity
        if(index===0&&(boardState[1]=="1"&&boardState[2]=="o"||boardState[1]=="o"&&boardState[2]=="2")&&(boardState[3]=="3"&&boardState[6]=="o"||boardState[3]=="o"&&boardState[6]=="6")){
          moveValue = 8;
        }else if(index==1&&(boardState[0]=="0"&&boardState[2]=="o"||boardState[0]=="o"&&boardState[2]=="2")&&(boardState[4]=="4"&&boardState[7]=="o"||boardState[4]=="o"&&boardState[7]=="7")){
          moveValue = 8;
        }else if(index==2&&(boardState[0]=="0"&&boardState[1]=="o"||boardState[0]=="o"&&boardState[1]=="1")&&(boardState[5]=="5"&&boardState[8]=="o"||boardState[5]=="o"&&boardState[8]=="8")){
          moveValue = 8;
        }else if(index==3&&(boardState[0]=="0"&&boardState[6]=="o"||boardState[0]=="o"&&boardState[6]=="6")&&(boardState[4]=="4"&&boardState[5]=="o"||boardState[4]=="o"&&boardState[5]=="5")){
          moveValue = 8;
        }else if(index==5&&(boardState[2]=="2"&&boardState[8]=="o"||boardState[2]=="o"&&boardState[8]=="8")&&(boardState[3]=="3"&&boardState[4]=="o"||boardState[3]=="o"&&boardState[4]=="4")){
          moveValue = 8;
        }else if(index==6&&(boardState[0]=="0"&&boardState[3]=="o"||boardState[0]=="o"&&boardState[3]=="2")&&(boardState[7]=="7"&&boardState[8]=="o"||boardState[7]=="o"&&boardState[8]=="8")){
          moveValue = 8;
        }else if(index==7&&(boardState[6]=="6"&&boardState[8]=="o"||boardState[6]=="o"&&boardState[8]=="8")&&(boardState[1]=="1"&&boardState[4]=="o"||boardState[1]=="o"&&boardState[4]=="4")){
          moveValue = 8;
        }else if(index==8&&(boardState[2]=="2"&&boardState[5]=="o"||boardState[2]=="o"&&boardState[5]=="5")&&(boardState[6]=="6"&&boardState[7]=="o"||boardState[6]=="o"&&boardState[7]=="7")){
          moveValue = 8;
        }
        
        // Fork opportunity
        if(index===0&&(boardState[1]=="1"&&boardState[2]=="x"||boardState[1]=="x"&&boardState[2]=="2")&&(boardState[3]=="3"&&boardState[6]=="x"||boardState[3]=="x"&&boardState[6]=="6")){
          moveValue = 13;
        }else if(index==1&&(boardState[0]=="0"&&boardState[2]=="x"||boardState[0]=="x"&&boardState[2]=="2")&&(boardState[4]=="4"&&boardState[7]=="x"||boardState[4]=="x"&&boardState[7]=="7")){
          moveValue = 13;
        }else if(index==2&&(boardState[0]=="0"&&boardState[1]=="x"||boardState[0]=="x"&&boardState[1]=="1")&&(boardState[5]=="5"&&boardState[8]=="x"||boardState[5]=="x"&&boardState[8]=="8")){
          moveValue = 13;
        }else if(index==3&&(boardState[0]=="0"&&boardState[6]=="x"||boardState[0]=="x"&&boardState[6]=="6")&&(boardState[4]=="4"&&boardState[5]=="x"||boardState[4]=="x"&&boardState[5]=="5")){
          moveValue = 13;
        }else if(index==5&&(boardState[2]=="2"&&boardState[8]=="x"||boardState[2]=="x"&&boardState[8]=="8")&&(boardState[3]=="3"&&boardState[4]=="x"||boardState[3]=="x"&&boardState[4]=="4")){
          moveValue = 13;
        }else if(index==6&&(boardState[0]=="0"&&boardState[3]=="x"||boardState[0]=="x"&&boardState[3]=="2")&&(boardState[7]=="7"&&boardState[8]=="x"||boardState[7]=="x"&&boardState[8]=="8")){
          moveValue = 13;
        }else if(index==7&&(boardState[6]=="6"&&boardState[8]=="x"||boardState[6]=="x"&&boardState[8]=="8")&&(boardState[1]=="1"&&boardState[4]=="x"||boardState[1]=="x"&&boardState[4]=="4")){
          moveValue = 13;
        }else if(index==8&&(boardState[2]=="2"&&boardState[5]=="x"||boardState[2]=="x"&&boardState[5]=="5")&&(boardState[6]=="6"&&boardState[7]=="x"||boardState[6]=="x"&&boardState[7]=="7")){
          moveValue = 13;
        }
       
        // Block opponen win
        if(index===0&&(boardState[1]=="o"&&boardState[2]=="o"||boardState[4]=="o"&&boardState[8]=="o"||boardState[3]=="o"&&boardState[6]=="o")){
          moveValue = 21;
        }else if(index==1&&(boardState[0]=="o"&&boardState[2]=="o"||boardState[4]=="o"&&boardState[7]=="o")){
          moveValue = 21;
        }else if(index==2&&(boardState[0]=="o"&&boardState[1]=="o"||boardState[5]=="o"&&boardState[8]=="o"||boardState[4]=="o"&&boardState[6]=="o")){
          moveValue = 21;
        }else if(index==3&&(boardState[4]=="o"&&boardState[5]=="o"||boardState[0]=="o"&&boardState[6]=="o")){
          moveValue = 21;
        }else if(index==4&&(boardState[0]=="o"&&boardState[8]=="o"||boardState[1]=="o"&&boardState[7]=="o")){
          moveValue = 21;
        }else if(index==5&&(boardState[2]=="o"&&boardState[8]=="o"||boardState[3]=="o"&&boardState[4]=="o")){
          moveValue = 21;
        }else if(index==6&&(boardState[7]=="o"&&boardState[8]=="o"||boardState[0]=="o"&&boardState[3]=="o"||boardState[2]=="o"&&boardState[4]=="o")){
          moveValue = 21;
        }else if(index==7&&(boardState[6]=="o"&&boardState[8]=="o"||boardState[1]=="o"&&boardState[4]=="o")){
          moveValue = 21;
        }else if(index==8&&(boardState[6]=="o"&&boardState[7]=="o"||boardState[0]=="o"&&boardState[4]=="o"||boardState[2]=="o"&&boardState[5]=="o")){
          moveValue = 21;
        }
        
        // WIN WIN WIN
        if(index===0&&(boardState[1]=="x"&&boardState[2]=="x"||boardState[4]=="x"&&boardState[8]=="x"||boardState[3]=="x"&&boardState[6]=="x")){
          moveValue = 34;
        }
        
        if(index==1&&(boardState[0]=="x"&&boardState[2]=="x"||boardState[4]=="x"&&boardState[7]=="x")){
          moveValue = 34;
        }
        
        if(index==2&&(boardState[0]=="x"&&boardState[1]=="x"||boardState[5]=="x"&&boardState[8]=="x"||boardState[4]=="x"&&boardState[6]=="x")){
          moveValue = 34;
        }
        
        if(index==3&&(boardState[4]=="x"&&boardState[5]=="x"||boardState[0]=="x"&&boardState[6]=="x")){
          moveValue = 34;
        }
        
        if(index==4&&(boardState[0]=="x"&&boardState[8]=="x"||boardState[1]=="x"&&boardState[7]=="x")){
          moveValue = 34;
        }
        
        if(index==5&&(boardState[2]=="x"&&boardState[8]=="x"||boardState[3]=="x"&&boardState[4]=="x")){
          moveValue = 34;
        }
        
        if(index==6&&(boardState[7]=="x"&&boardState[8]=="x"||boardState[0]=="x"&&boardState[3]=="x"||boardState[2]=="x"&&boardState[4]=="x")){
          moveValue = 34;
        }
        
        if(index==7&&(boardState[6]=="x"&&boardState[8]=="x"||boardState[1]=="x"&&boardState[4]=="x")){
          moveValue = 34;
        }
        
        if(index==8&&(boardState[6]=="x"&&boardState[7]=="x"||boardState[0]=="x"&&boardState[4]=="x"||boardState[2]=="x"&&boardState[5]=="x")){
          moveValue = 34;
        }
     
        if (moveValue>bestValue){
          position=index;
          bestValue=moveValue;
        }  
        boardState[index]=index.toString();
      }
  });
   //return position;
 }
  
  function getValueO(boardState){
   boardState.forEach(function(element, index) {
      if(element!="o"&&element!="x"){
        boardState[index]="o";
        
        // Empty edge
        if (index==1||index==3||index==5||index==7){
          moveValue=1;
          }
        
        // Empty corner
        if (index===0||index==2||index==6||index==8){
          moveValue=2;
          }
        
        // Empty opposite corner
        if (index===0&&boardState[8]=="o"){
          moveValue=3;
          }
        if(index==2&&boardState[6]=="o"){
          moveValue=3;
          }
        if(index==6&&boardState[2]=="o"){
          moveValue=3;
          }
        if(index==8&&boardState[0]=="o"){
          moveValue=3;
          }
        
        // Center
        if(index==4){
          moveValue=5;
        }
        
        // Block fork opportunity
        if(index===0&&(boardState[1]=="1"&&boardState[2]=="x"||boardState[1]=="x"&&boardState[2]=="2")&&(boardState[3]=="3"&&boardState[6]=="x"||boardState[3]=="x"&&boardState[6]=="6")){
          moveValue = 8;
        }else if(index==1&&(boardState[0]=="0"&&boardState[2]=="x"||boardState[0]=="x"&&boardState[2]=="2")&&(boardState[4]=="4"&&boardState[7]=="x"||boardState[4]=="x"&&boardState[7]=="7"||boardState[0]=="x"&&boardState[8]=="x"||boardState[2]=="x"&&boardState[6]=="x")){
          moveValue = 10;
        }else if(index==2&&(boardState[0]=="0"&&boardState[1]=="x"||boardState[0]=="x"&&boardState[1]=="1")&&(boardState[5]=="5"&&boardState[8]=="x"||boardState[5]=="x"&&boardState[8]=="8")){
          moveValue = 8;
        }else if(index==3&&(boardState[0]=="0"&&boardState[6]=="x"||boardState[0]=="x"&&boardState[6]=="6")&&(boardState[4]=="4"&&boardState[5]=="x"||boardState[4]=="x"&&boardState[5]=="5")){
          moveValue = 8;
        }else if(boardState[4]=="0"&&index==5&&(boardState[2]=="2"&&boardState[8]=="x"||boardState[2]=="x"&&boardState[8]=="8")&&(boardState[3]=="3"&&boardState[4]=="x"||boardState[3]=="x"&&boardState[4]=="4")){
          moveValue = 8;
        }else if(index==6&&(boardState[0]=="0"&&boardState[3]=="x"||boardState[0]=="x"&&boardState[3]=="2")&&(boardState[7]=="7"&&boardState[8]=="x"||boardState[7]=="x"&&boardState[8]=="8")){
          moveValue = 8;
        }else if(boardState[4]=="0"&&index==7&&(boardState[6]=="6"&&boardState[8]=="x"||boardState[6]=="x"&&boardState[8]=="8")&&(boardState[1]=="1"&&boardState[4]=="x"||boardState[1]=="x"&&boardState[4]=="4")){
          moveValue = 8;
        }else if(index==8&&(boardState[2]=="2"&&boardState[5]=="x"||boardState[2]=="x"&&boardState[5]=="5")&&(boardState[6]=="6"&&boardState[7]=="x"||boardState[6]=="x"&&boardState[7]=="7")){
          moveValue = 8;
        }
        
        // Fork opportunity
        if(index===0&&(boardState[1]=="1"&&boardState[2]=="o"||boardState[1]=="o"&&boardState[2]=="2")&&(boardState[3]=="3"&&boardState[6]=="o"||boardState[3]=="o"&&boardState[6]=="6")){
          moveValue = 13;
        }else if(index==1&&(boardState[0]=="0"&&boardState[2]=="o"||boardState[0]=="o"&&boardState[2]=="2")&&(boardState[4]=="4"&&boardState[7]=="o"||boardState[4]=="o"&&boardState[7]=="7")){
          moveValue = 13;
        }else if(index==2&&(boardState[0]=="0"&&boardState[1]=="o"||boardState[0]=="o"&&boardState[1]=="1")&&(boardState[5]=="5"&&boardState[8]=="o"||boardState[5]=="o"&&boardState[8]=="8")){
          moveValue = 13;
        }else if(index==3&&(boardState[0]=="0"&&boardState[6]=="o"||boardState[0]=="o"&&boardState[6]=="6")&&(boardState[4]=="4"&&boardState[5]=="o"||boardState[4]=="o"&&boardState[5]=="5")){
          moveValue = 13;
        }else if(index==5&&(boardState[2]=="2"&&boardState[8]=="o"||boardState[2]=="o"&&boardState[8]=="8")&&(boardState[3]=="3"&&boardState[4]=="o"||boardState[3]=="o"&&boardState[4]=="4")){
          moveValue = 13;
        }else if(index==6&&(boardState[0]=="0"&&boardState[3]=="o"||boardState[0]=="o"&&boardState[3]=="2")&&(boardState[7]=="7"&&boardState[8]=="o"||boardState[7]=="o"&&boardState[8]=="8")){
          moveValue = 13;
        }else if(index==7&&(boardState[6]=="6"&&boardState[8]=="o"||boardState[6]=="o"&&boardState[8]=="8")&&(boardState[1]=="1"&&boardState[4]=="o"||boardState[1]=="o"&&boardState[4]=="4")){
          moveValue = 13;
        }else if(index==8&&(boardState[2]=="2"&&boardState[5]=="o"||boardState[2]=="o"&&boardState[5]=="5")&&(boardState[6]=="6"&&boardState[7]=="o"||boardState[6]=="o"&&boardState[7]=="7")){
          moveValue = 13;
        }
       
        // Block opponen win
        if(index===0&&(boardState[1]=="x"&&boardState[2]=="x"||boardState[4]=="x"&&boardState[8]=="x"||boardState[3]=="x"&&boardState[6]=="x")){
          moveValue = 21;
        }else if(index==1&&(boardState[0]=="x"&&boardState[2]=="x"||boardState[4]=="x"&&boardState[7]=="x")){
          moveValue = 21;
        }else if(index==2&&(boardState[0]=="x"&&boardState[1]=="x"||boardState[5]=="x"&&boardState[8]=="x"||boardState[4]=="x"&&boardState[6]=="x")){
          moveValue = 21;
        }else if(index==3&&(boardState[4]=="x"&&boardState[5]=="x"||boardState[0]=="x"&&boardState[6]=="x")){
          moveValue = 21;
        }else if(index==4&&(boardState[0]=="x"&&boardState[8]=="x"||boardState[1]=="x"&&boardState[7]=="x")){
          moveValue = 21;
        }else if(index==5&&(boardState[2]=="x"&&boardState[8]=="x"||boardState[3]=="x"&&boardState[4]=="x")){
          moveValue = 21;
        }else if(index==6&&(boardState[7]=="x"&&boardState[8]=="x"||boardState[0]=="x"&&boardState[3]=="x"||boardState[2]=="x"&&boardState[4]=="x")){
          moveValue = 21;
        }else if(index==7&&(boardState[6]=="x"&&boardState[8]=="x"||boardState[1]=="x"&&boardState[4]=="x")){
          moveValue = 21;
        }else if(index==8&&(boardState[6]=="x"&&boardState[7]=="x"||boardState[0]=="x"&&boardState[4]=="x"||boardState[2]=="x"&&boardState[5]=="x")){
          moveValue = 21;
        }
        
        // WIN WIN WIN
        if(index===0&&(boardState[1]=="o"&&boardState[2]=="o"||boardState[4]=="o"&&boardState[8]=="o"||boardState[3]=="o"&&boardState[6]=="o")){
          moveValue = 34;
        }
        
        if(index==1&&(boardState[0]=="o"&&boardState[2]=="o"||boardState[4]=="o"&&boardState[7]=="o")){
          moveValue = 34;
        }
        
        if(index==2&&(boardState[0]=="o"&&boardState[1]=="o"||boardState[5]=="o"&&boardState[8]=="o"||boardState[4]=="o"&&boardState[6]=="o")){
          moveValue = 34;
        }
        
        if(index==3&&(boardState[4]=="o"&&boardState[5]=="o"||boardState[0]=="o"&&boardState[6]=="o")){
          moveValue = 34;
        }
        
        if(index==4&&(boardState[0]=="o"&&boardState[8]=="o"||boardState[1]=="o"&&boardState[7]=="o")){
          moveValue = 34;
        }
        
        if(index==5&&(boardState[2]=="o"&&boardState[8]=="o"||boardState[3]=="o"&&boardState[4]=="o")){
          moveValue = 34;
        }
        
        if(index==6&&(boardState[7]=="o"&&boardState[8]=="o"||boardState[0]=="o"&&boardState[3]=="o"||boardState[2]=="o"&&boardState[4]=="o")){
          moveValue = 34;
        }
        
        if(index==7&&(boardState[6]=="o"&&boardState[8]=="o"||boardState[1]=="o"&&boardState[4]=="o")){
          moveValue = 34;
        }
        
        if(index==8&&(boardState[6]=="o"&&boardState[7]=="o"||boardState[0]=="o"&&boardState[4]=="o"||boardState[2]=="o"&&boardState[5]=="o")){
          moveValue = 34;
        }
     
        if (moveValue>bestValue){
          position=index;
          bestValue=moveValue;
        }  
        boardState[index]=index.toString();
      
      }
  });
   //return position;
 }

  // Human player
  $( ".button" ).mouseup(function() {
    position=$(this).attr('id').charAt(1);
    updateTurn();
  });
  
 function updateTurn(){
  if(board[position]!="o"&&board[position]!="x"&&round<9){
      if (turn===false){
        board[position]="o";
        $("#b"+position).find( ".back" ).html("<i class='fa fa-circle-o' aria-hidden='true'></i>");
      }else {
        board[position]="x";
        $("#b"+position).find( ".back" ).html("<i class='fa fa-times' aria-hidden='true'></i>");
      }
      $("#b"+position).children().toggleClass("flip");
      // Check if the game ends and do some animation magic
      if(board[0]==board[1]&&board[1]==board[2]){
        $("#b0").css("background-color", "lightyellow").fadeIn( "slow" );
        $("#b0").css("color", "black").fadeIn( "slow" );
        $("#b1").css("background-color", "lightyellow").fadeIn( "slow" );
        $("#b1").css("color", "black").fadeIn( "slow" );
        $("#b2").css("background-color", "lightyellow").fadeIn( "slow" );
        $("#b2").css("color", "black").fadeIn( "slow" );
        $( "#b3" ).delay(500).animate({ "top": "-=115px", opacity: 0}, 500);
        $( "#b4" ).delay(500).animate({ "top": "-=115px", opacity: 0}, 500);
        $( "#b5" ).delay(500).animate({ "top": "-=115px", opacity: 0}, 500);
        $( "#b6" ).delay(500).animate({ "top": "-=230px", opacity: 0}, 500);
        $( "#b7" ).delay(500).animate({ "top": "-=230px", opacity: 0}, 500);
        $( "#b8" ).delay(500).animate({ "top": "-=230px", opacity: 0}, 500);
        win=true;
      }else if(board[3]==board[4]&&board[4]==board[5]){
        $("#b3").css("background-color", "lightyellow").fadeIn( "slow" );
        $("#b3").css("color", "black").fadeIn( "slow" );
        $("#b4").css("background-color", "lightyellow").fadeIn( "slow" );
        $("#b4").css("color", "black").fadeIn( "slow" );
        $("#b5").css("background-color", "lightyellow").fadeIn( "slow" );
        $("#b5").css("color", "black").fadeIn( "slow" );
        $( "#b0" ).delay(500).animate({ "top": "+=115px", opacity: 0}, 500);
        $( "#b1" ).delay(500).animate({ "top": "+=115px", opacity: 0}, 500);
        $( "#b2" ).delay(500).animate({ "top": "+=115px", opacity: 0}, 500);
        $( "#b6" ).delay(500).animate({ "top": "-=115px", opacity: 0}, 500);
        $( "#b7" ).delay(500).animate({ "top": "-=115px", opacity: 0}, 500);
        $( "#b8" ).delay(500).animate({ "top": "-=115px", opacity: 0}, 500);
        win=true;
      }else if(board[6]==board[7]&&board[7]==board[8]){
        $("#b6").css("background-color", "lightyellow").fadeIn( "slow" );
        $("#b6").css("color", "black").fadeIn( "slow" );
        $("#b7").css("background-color", "lightyellow").fadeIn( "slow" );
        $("#b7").css("color", "black").fadeIn( "slow" );
        $("#b8").css("background-color", "lightyellow").fadeIn( "slow" );
        $("#b8").css("color", "black").fadeIn( "slow" );
        $( "#b0" ).delay(500).animate({ "top": "+=230px", opacity: 0}, 500);
        $( "#b1" ).delay(500).animate({ "top": "+=230px", opacity: 0}, 500);
        $( "#b2" ).delay(500).animate({ "top": "+=230px", opacity: 0}, 500);
        $( "#b3" ).delay(500).animate({ "top": "+=115px", opacity: 0}, 500);
        $( "#b4" ).delay(500).animate({ "top": "+=115px", opacity: 0}, 500);
        $( "#b5" ).delay(500).animate({ "top": "+=115px", opacity: 0}, 500);
        win=true;
      }else if(board[0]==board[3]&&board[3]==board[6]){
        $("#b0").css("background-color", "lightyellow").fadeIn( "slow" );
        $("#b0").css("color", "black").fadeIn( "slow" );
        $("#b3").css("background-color", "lightyellow").fadeIn( "slow" );
        $("#b3").css("color", "black").fadeIn( "slow" );
        $("#b6").css("background-color", "lightyellow").fadeIn( "slow" );
        $("#b6").css("color", "black").fadeIn( "slow" );
        $( "#b1" ).delay(500).animate({ "left": "-=115px", opacity: 0}, 500);
        $( "#b2" ).delay(500).animate({ "left": "-=230px", opacity: 0}, 500);
        $( "#b4" ).delay(500).animate({ "left": "-=115px", opacity: 0}, 500);
        $( "#b5" ).delay(500).animate({ "left": "-=230px", opacity: 0}, 500);
        $( "#b7" ).delay(500).animate({ "left": "-=115px", opacity: 0}, 500);
        $( "#b8" ).delay(500).animate({ "left": "-=230px", opacity: 0}, 500);
        win=true;
      }else if(board[1]==board[4]&&board[4]==board[7]){
        $("#b1").css("background-color", "lightyellow").fadeIn( "slow" );
        $("#b1").css("color", "black").fadeIn( "slow" );
        $("#b4").css("background-color", "lightyellow").fadeIn( "slow" );
        $("#b4").css("color", "black").fadeIn( "slow" );
        $("#b7").css("background-color", "lightyellow").fadeIn( "slow" );
        $("#b7").css("color", "black").fadeIn( "slow" );
        $( "#b0" ).delay(500).animate({ "left": "+=115px", opacity: 0}, 500);
        $( "#b3" ).delay(500).animate({ "left": "+=115px", opacity: 0}, 500);
        $( "#b6" ).delay(500).animate({ "left": "+=115px", opacity: 0}, 500);
        $( "#b2" ).delay(500).animate({ "left": "-=115px", opacity: 0}, 500);
        $( "#b5" ).delay(500).animate({ "left": "-=115px", opacity: 0}, 500);
        $( "#b8" ).delay(500).animate({ "left": "-=115px", opacity: 0}, 500);
        win=true;
      }else if(board[2]==board[5]&&board[5]==board[8]){
        $("#b2").css("background-color", "lightyellow").fadeIn( "slow" );
        $("#b2").css("color", "black").fadeIn( "slow" );
        $("#b5").css("background-color", "lightyellow").fadeIn( "slow" );
        $("#b5").css("color", "black").fadeIn( "slow" );
        $("#b8").css("background-color", "lightyellow").fadeIn( "slow" );
        $("#b8").css("color", "black").fadeIn( "slow" );
        $( "#b0" ).delay(500).animate({ "left": "+=230px", opacity: 0}, 500);
        $( "#b3" ).delay(500).animate({ "left": "+=230px", opacity: 0}, 500);
        $( "#b6" ).delay(500).animate({ "left": "+=230px", opacity: 0}, 500);
        $( "#b1" ).delay(500).animate({ "left": "+=115px", opacity: 0}, 500);
        $( "#b4" ).delay(500).animate({ "left": "+=115px", opacity: 0}, 500);
        $( "#b7" ).delay(500).animate({ "left": "+=115px", opacity: 0}, 500);         
        win=true;
      }else if(board[0]==board[4]&&board[4]==board[8]){
        $("#b0").css("background-color", "lightyellow").fadeIn( "slow" );
        $("#b0").css("color", "black").fadeIn( "slow" );
        $("#b4").css("background-color", "lightyellow").fadeIn( "slow" );
        $("#b4").css("color", "black").fadeIn( "slow" );
        $("#b8").css("background-color", "lightyellow").fadeIn( "slow" );
        $("#b8").css("color", "black").fadeIn( "slow" );
        $( "#b1" ).delay(500).animate({ "left": "-=53px", "top": "+=53px", opacity: 0}, 500);
        $( "#b2" ).delay(500).animate({ "left": "-=115px", "top": "+=115px", opacity: 0}, 500);
        $( "#b3" ).delay(500).animate({ "left": "+=53px", "top": "-=53px",opacity: 0}, 500);
        $( "#b5" ).delay(500).animate({ "left": "-=53px", "top": "+=53px",opacity: 0}, 500);
        $( "#b6" ).delay(500).animate({ "left": "+=115px", "top": "-=115px", opacity: 0}, 500);
        $( "#b7" ).delay(500).animate({ "left": "+=53px", "top": "-=53px", opacity: 0}, 500); 
        win=true;
      }else if(board[2]==board[4]&&board[4]==board[6]){
        $("#b2").css("background-color", "lightyellow").fadeIn( "slow" );
        $("#b2").css("color", "black").fadeIn( "slow" );
        $("#b4").css("background-color", "lightyellow").fadeIn( "slow" );
        $("#b4").css("color", "black").fadeIn( "slow" );
        $("#b6").css("background-color", "lightyellow").fadeIn( "slow" );
        $("#b6").css("color", "black").fadeIn( "slow" );
        $( "#b0" ).delay(500).animate({ "left": "+=115px", "top": "+=115px", opacity: 0}, 500);
        $( "#b1" ).delay(500).animate({ "left": "+=53px", "top": "+=53px", opacity: 0}, 500);
        $( "#b3" ).delay(500).animate({ "left": "+=53px", "top": "+=53px", opacity: 0}, 500);
        $( "#b5" ).delay(500).animate({ "left": "-=53px", "top": "-=53px", opacity: 0}, 500);
        $( "#b7" ).delay(500).animate({ "left": "-=53px", "top": "-=53px", opacity: 0}, 500);
        $( "#b8" ).delay(500).animate({ "left": "-=115px", "top": "-=115px", opacity: 0}, 500); 
        win=true;
      }
      
      if (win===true){
      // Check who won the game and display results 
        if (turn===false){
          $(".display").html("<i class='fa fa-circle-o' aria-hidden='true'></i> WINS! Play again?");
          nought++;
          $("#nought").find(".button").html(nought);
        }else {
          $(".display").html("<i class='fa fa-times' aria-hidden='true'></i> WINS! Play again?");
          cross++;
          $("#cross").find(".button").html(cross);
        }
        // set end state
        round=9;
      }else{
        // Game still ongoing, update turn to display
        // turn = which mark made last move
        round++;
        if (turn===false){
          $(".display").html("<i class='fa fa-times' aria-hidden='true'></i> turn");
          turn=true;
          if (turnSet){
            computerPlay();
          }
        }else {
          $(".display").html("<i class='fa fa-circle-o' aria-hidden='true'></i> turn");
          turn=false;
          if (!turnSet&&round<9){
            console.log("NOLLAPELI: " +round);
            computerPlay();
          }
        }
        
        // Game ends a draw
        if(round==9&&win===false){
          $(".display").html("Draw! Play again?");
        }
      }
    } // MAJOR IFFFF!!
  }
  
  // Reset the game state
  $( ".display" ).mouseup(function() {
    resetGame();
  });
 
  function resetGame(){
    $(".flip-container").removeClass("flip");
    $(".button").find( ".back" ).html("");
    turn=true;
    $(".display").html("<i class='fa fa-times' aria-hidden='true'></i> turn");
    /*if (turn){
    $(".display").html("<i class='fa fa-times' aria-hidden='true'></i> turn");
    }else $(".display").html("<i class='fa fa-circle-o' aria-hidden='true'></i> turn");
    */
    win=false;
    board=["0", "1", "2", "3", "4", "5", "6", "7", "8"];
    round=0;
    counter = 0;
    $("#b0").css( {top: "0px", left: "0px"}  );
    $("#b1").css( {top: "0px", left: "100px"}  );
    $("#b2").css( {top: "0px", left: "200px"}  );
    $("#b3").css( {top: "100px", left: "0px"}  );
    $("#b4").css( {top: "100px", left: "100px"}  );
    $("#b5").css( {top: "100px", left: "200px"}  );
    $("#b6").css( {top: "200px", left: "0px"}  );
    $("#b7").css( {top: "200px", left: "100px"}  );
    $("#b8").css( {top: "200px", left: "200px"}  );
    $(".button").css("background-color", "transparent").fadeIn( "slow" );
    $(".button").css("color", "white").fadeIn( "slow" );
    $(".button").css("opacity", "1").fadeIn( "slow" );
    $(".button").fadeIn( "slow" );
    
    if (turnSet){
      computerPlay();
    }
    
    };
   
 // Check player mark
 $( "input[type='radio']" ).change(function() {
  // Check input( $( this ).val() ) for validity here
   nought = 0; // nought win amount
   cross = 0; // cross win amount
   $("#nought").find(".button").html(nought);
   $("#cross").find(".button").html(cross);
   turnSet=!document.getElementById("player").checked;
   resetGame();
}); 
  
});