let scores=JSON.parse(localStorage.getItem('score'));
        if(scores===null){
           scores={
            wins: 0,
            losses: 0,
            ties: 0 
           }
        }

        updateScore();

        let isPlaying=false;
        let intervalID;

        function startAutoPlay(){
            if(!isPlaying){
                intervalID=setInterval(function(){
                    let playerMove=computerVal();
                    playGame(playerMove);
                }, 1000);
                isPlaying=true;
                document.querySelector('.js-autoPlay-button').innerHTML='Stop';
                document.querySelector('.js-autoPlay-button').classList.toggle('auto-button');
            }
            else{
                clearInterval(intervalID);
                document.querySelector('.js-autoPlay-button').innerHTML='Auto Play';
                isPlaying=false;
                document.querySelector('.js-autoPlay-button').classList.toggle('auto-button');
            }
        }

        let playerChoice='';
        function playGame(playerMove){
            playerChoice=playerMove;
            const computerMove=computerVal();
            let result='';
            if(playerMove==='scissors'){
                if(computerMove==='rock') result='You lose';
                else if(computerMove==='paper') result='You won';
                else result='Tie';
            }
            else if(playerMove==='rock'){
                if(computerMove==='rock') result='Tie';
                else if(computerMove==='paper') result='You lose';
                else result='You won';
            }
            else{
                if(computerMove==='rock') result='You won';
                else if(computerMove==='paper') result='Tie';
                else result='You lose';
            }
            if(result==='You won') scores.wins++;
            else if(result==='You lose') scores.losses++;
            else scores.ties++;

            localStorage.setItem('score',JSON.stringify(scores));

            document.querySelector('.js-move').innerHTML=
            `you <img src="${playerChoice}-emoji.png" class="rock-icon"> 
            computer <img src="${computerMove}-emoji.png" class="computerMove-icon">`;

            document.querySelector('.js-result').innerHTML=result;

            updateScore();
        }
        function computerVal(){
            let computerMove='';
            val=Math.random();
            if(val>=0&&val<1/3){
                computerMove='rock';
            }
            else if(val>=1/3&&val<2/3){
                computerMove='paper';
            }
            else{
                computerMove='scissors';
            }
            return computerMove;
        }
        function updateScore(){
            document.querySelector('.js-score')
            .innerHTML=`Wins: ${scores.wins}, Losses: ${scores.losses}, Ties: ${scores.ties}`;
        }