import React from "react";
import Cookie from "./Cookie";
import Scoreboard from "./Scoreboard";
import { useState, useEffect, useRef } from "react";
import Shop from "./Shop";
import Shield from "./Shield";
import Elmo from "./Elmo";
import HomeScreen from "./HomeScreen";
import Timer from "./Timer";


function CookieClicker(){
    const levelAmount = 5;
    const [score, setScore] = useState(0);
    const [helper, setHelper] = useState(0);
    const [level, setLevel] = useState(1);
    const [helperLevel, setHelperLevel] = useState(1);
    const [potion, setPotion] = useState(1);
    const [shieldActive, setShieldActive] = useState(false);
    const [shieldTime, setShieldTime] = useState(0);
    const [elmos, setElmos] = useState([]);
    const [elmoRender, setElmoRender] = useState(0);
    const [seconds, setSeconds] = useState(0);
    const [elmoSec, setElmoSec] = useState(0);
    const [elmoCollision, setElmoCollision] = useState(false);
    const shieldActiveRef = useRef(shieldActive);
    const effectIntervalRef = useRef(null);
    const [gameStarted, setGameStarted] = useState(false);
    const [gameTimer, setGameTimer] = useState(0); 
    const [timer, setTimer] = useState(0); 
    const [intervalId, setIntervalId] = useState(null); 
    const [gameOverText, setGameOverText] = useState("🖱️ Welcome to the ultimate Cookie Clicker 🍪");
    const elmoEffectLevel = 2;
    const elmoEffectTime = 10;
    const upgradeHelperPrice = 250;
    const buyHelperPrice = 100;
    const timesTwoPotionPrice = 50;
    const timesThreePotionPrice = 150;
    const timesFourPotionPrice = 600;
    const fiveSecShieldPrice = 400;
    const tenSecShieldPrice = 600;
    const potionTime = 5000;

    const [shopList, setShopList] = useState([
        {title: "Helper",
            items: [{name: "⬆", price: upgradeHelperPrice, available: true,  onClick: onUpgradeHelper},
                    {name: "+", price: buyHelperPrice, available: true, onClick: onBuyHelper}]},
        {title: "Potions",
            items: [{name: "x2", price: timesTwoPotionPrice, available: true, onClick: onBuyTimesTwoPotion},
                    {name: "x3", price: timesThreePotionPrice, available: true, onClick: onBuyTimesThreePotion},
                    {name: "x4", price: timesFourPotionPrice, available: true, onClick: onBuyTimesFourPotion}]},
        {title: "Shields",
            items: [{name: "5s", price: fiveSecShieldPrice, available: true, onClick: onFiveSecShield},
                    {name: "10s", price: tenSecShieldPrice, available: true, onClick: onTenSecShield}]}
    ]);

    useEffect(() => {
      if (gameStarted) {
        const interval = setInterval(() => {
          setTimer((prev) => prev + 1);
        }, 1000);
        setIntervalId(interval);
      } else {
        setGameTimer(timer);
        if (intervalId) {
          clearInterval(intervalId);
          setIntervalId(null);
        }
      }
      return () => {
        if (intervalId) {
          clearInterval(intervalId);
        }
      };
    }, [gameStarted]);

    function gameWon(){
      setGameStarted(false);
      resetGame();
      setGameOverText("🙌 Congratulations 🎉");
    }

    function gameLost(){
      setGameStarted(false);
      resetGame();
      setGameOverText("🥹 Maybe next time 👎");
    }

    function resetGame(){
      clearEffectInterval();
      setElmoCollision(false);
      setShieldActive(false);
      setPotion(1);
      setElmos([]);
      setScore(0);
      setHelper(0);
      setHelperLevel(2);
      setLevel(1);
      enableShopItem("Helper", "+");
      enableShopItem("Helper", "⬆");
    }

    useEffect(() => {
      console.log(timer);
    }, [timer])  

    function onStartGame(){
      setTimer(0);
      setElmos([]);
      setGameStarted(true);
      console.log(gameStarted);
    }
    
    async function onTenSecShield(){
        if(await enoughScore(tenSecShieldPrice)){
            deductScore(tenSecShieldPrice);
            activateShield(10000);
        } else {
            console.log("score is not high enough");
        }
    }

    async function onFiveSecShield(){
        if(await enoughScore(fiveSecShieldPrice)){
            deductScore(fiveSecShieldPrice);
            activateShield(5000);
        } else {
            console.log("score is not high enough");
        }
    }

    function activateShield(time){
        setShieldActive(true);
        setShieldTime(time)
        disableShopItem("Shields", "5s");
        disableShopItem("Shields", "10s");
        setTimeout(() => {
            enableShopItem("Shields", "5s");
            enableShopItem("Shields", "10s");
            setShieldTime(0);
            setShieldActive(false);
        }, time)
    }

    async function onBuyTimesFourPotion(){
        if(await enoughScore(timesFourPotionPrice)){
            deductScore(timesFourPotionPrice);
            activatePotion(4);
        } else {
            console.log("score is not high enough");
        }
    }

    async function onBuyTimesThreePotion(){
        if(await enoughScore(timesThreePotionPrice)){
            deductScore(timesThreePotionPrice);
            activatePotion(3);
        } else {
            console.log("score is not high enough");
        }
    }

   async function onBuyTimesTwoPotion(){
    if(await enoughScore(timesTwoPotionPrice)){
        deductScore(timesTwoPotionPrice);
        activatePotion(2);
    } else {
        console.log("score is not high enough");
    }
    }

    function activatePotion(level){
        setPotion(level);
        disableShopItem("Potions", "x2");
        disableShopItem("Potions", "x3");
        disableShopItem("Potions", "x4");
        setTimeout(() => {
            enableShopItem("Potions", "x2");
            enableShopItem("Potions", "x3");
            enableShopItem("Potions", "x4");
            setPotion(1);
        }, potionTime);
    }

    async function onBuyHelper(){
        if(await enoughScore(buyHelperPrice)){
            deductScore(buyHelperPrice);
            setHelper((prevHelper) => {
                console.log('Previous Helper:', prevHelper);  
                if (prevHelper < 2) {
                    return prevHelper + 1;
                } else {
                    disableShopItem("Helper", "+");
                    return prevHelper + 1; 
                }
              });
        } else {
            console.log("score is not high enough");
        }
    };


    async function onUpgradeHelper(){
        if(await enoughScore(upgradeHelperPrice)){
            deductScore(upgradeHelperPrice);
            setHelperLevel((prevHelperLvl) => {
                console.log('Previous Helper Level:', prevHelperLvl);  
                if (prevHelperLvl < 4) {
                    return prevHelperLvl + 1;
                } else {
                    disableShopItem("Helper", "⬆");
                    return prevHelperLvl + 1; 
                }
              });
        } else {
            console.log("score is not high enough");
        }
    };

    function disableShopItem(categoryName, itemName){
        setShopList((prevShopList) =>
            prevShopList.map((category) => {
              if (category.title === categoryName) {
                return {
                  ...category,
                  items: category.items.map((item) => {
                    if (item.name === itemName) {
                      return { ...item, available: false }; 
                    }
                    return item;
                  }),
                };
              }
              return category;
            })
          );
    }

    function enableShopItem(categoryName, itemName){
        setShopList((prevShopList) =>
            prevShopList.map((category) => {
              if (category.title === categoryName) {
                return {
                  ...category,
                  items: category.items.map((item) => {
                    if (item.name === itemName) {
                      return { ...item, available: true }; 
                    }
                    return item;
                  }),
                };
              }
              return category;
            })
          );
    }
    
    function enoughScore(price){
        return new Promise((resolve) => {
            setScore((prev) => {
                if (prev >= price) {
                    resolve(true); 
                } else {
                    resolve(false); 
                }
                return prev;
            });
        });
    }

    function deductScore(price){
        setScore((prev) => {
            return prev - price;
        })
    }


    function onCookieClick(){
      if(score < 1000 - (1 * helperLevel * helper * potion) && level <= levelAmount){
          if(helper > 0){
              setScore(score + (1 * helperLevel * helper * potion));
          } else{
              setScore(score + (1 * potion));
          }
      } else if (score >= 1000 - (1 * helperLevel * helper * potion) && level < levelAmount){
          setLevel(level + 1);
          setElmos([]);
          setScore(0);
      } else if (score >= 1000 - (1 * helperLevel * helper * potion) && level === levelAmount){
          gameWon();
        } 
    }

    useEffect(() => {
        generateElmoArray();
    }, [gameStarted])

    useEffect(() => {
      setElmoCollision(false);
      clearEffectInterval(); 
      generateElmoArray();
    }, [level])

    useEffect(() => {
        const elmoElementsLength = document.querySelectorAll('.elmo').length;
        const elmoElements = document.querySelectorAll('.elmo');
        if(elmoElementsLength > 0){
            elmoElements.forEach((elmo) => {
                elmo.style.animation = 'none'; 
                void elmo.offsetWidth;       
                elmo.style.animation = 'moveToCenter 4s ease-in-out forwards'; 
            });
        }
        calcElmoStartingPosition();
        const interval = setInterval(() => {
            setSeconds(prevSeconds => {
            if (prevSeconds + 1 === 10000) {
                clearInterval(interval); 
            }
            checkElmoCollision();
            return prevSeconds + 1;
            });
        }, 1000);
        return () => clearInterval(interval);
    }, [elmoRender])


    function generateElmoArray(){
        setElmos([]);
        setElmoRender((prev) => prev + 1);
        const elmoData = Array.from({ length: Math.floor(Math.random() * level + 1) }, (_, index) => ({
            id: `elmo${index + 1}`,
            left: `${Math.floor(Math.random() * 81) + 10}%`,
            top: '0%',
            isAtCore: false,
            active: true
          }));
          setElmos(elmoData);
          setElmoRender((prev) => prev + 1);
    }

    function onElmoClick(elmoId){
        setElmos((prev) => {
            const updatedElmos = prev.filter((e) => e.id !== elmoId);
            if (updatedElmos.length === 0) {
                generateElmoArray();
            }
            return updatedElmos;
          });
    }

    function calcElmoStartingPosition(){
        elmos.forEach((elmo) => {
            const elmoElement = document.getElementById(elmo.id);
            if(elmoElement){
            const rect = elmoElement.getBoundingClientRect();
            const startX = rect.left;
            elmoElement.style.setProperty('--elmo-start-x', `${startX}px`);
            elmoElement.style.animation = 'none';
            void elmoElement.offsetWidth; 
            elmoElement.style.animation = 'moveToCenter 4s ease-in-out forwards';
          }
            });
        
    }

    useEffect(() => {
        shieldActiveRef.current = shieldActive; 
      }, [shieldActive]);


      function checkElmoCollision() {
        const elmos = document.querySelectorAll('.elmo');
        const cookieOutline = document.querySelector('.cookieOutline');
        if (!cookieOutline) return;
    
        const cookieRect = cookieOutline.getBoundingClientRect();
    
        elmos.forEach(elmo => {
          const elmoRect = elmo.getBoundingClientRect();
          const isColliding = !(
            elmoRect.right < cookieRect.left + 30 ||
            elmoRect.left > cookieRect.right + 30 ||
            elmoRect.bottom < cookieRect.top + 30 ||
            elmoRect.top > cookieRect.bottom + 30
          );
    
          if (isColliding) {
            const elmoId = elmo.getAttribute('id');
            if (!elmoCollision && !shieldActiveRef.current) {
              setElmoCollision(true);
              onElmoClick(elmoId);
              elmoEffectApplication();
            } else if (elmoCollision) {
              onElmoClick(elmoId);
            } else if (shieldActiveRef.current) {
              onElmoClick(elmoId);
            }
          }
        });
      }


      function elmoEffectApplication() {
        clearEffectInterval();
        const interval = setInterval(() => {
          setElmoSec(prevSeconds => {
            if (prevSeconds + 1 === elmoEffectTime) {
              setElmoCollision(false);
              clearEffectInterval(); 
              return 0; 
            }
            elmoEffect(); 
            return prevSeconds + 1; 
          });
        }, 1000);
        effectIntervalRef.current = interval;
      }
      
      function clearEffectInterval() {
        if (effectIntervalRef.current) {
          clearInterval(effectIntervalRef.current);
          effectIntervalRef.current = null; 
        }
      }
    
    function elmoEffect(){
      setScore((prev) => {
        if(prev - (elmoEffectLevel * (Math.floor(level/2)) + 1) >= 0){
          return prev - (elmoEffectLevel * (Math.floor(level/2)) + 1);
        } else if(prev - (elmoEffectLevel * (Math.floor(level/2)) + 1) < 0){
          gameLost();
        }
      });
    }

    useEffect(() => {
        return () => clearEffectInterval();
      }, [gameStarted]);
    

return (
        <div>
          {gameStarted ? (
            <>
              {shieldActive && <Shield score={score} />}
              <Shop list={shopList} />
              <Cookie score={score} onCookieClick={onCookieClick} />
              <Timer timer={timer}/>
              <Scoreboard
                score={score}
                level={level}
                levelAmount={levelAmount}
                helpers={helper}
                potion={potion}
                potionTime={potionTime}
                shieldTime={shieldTime}
                shieldActive={shieldActive}
                helperLevel={helperLevel}
                elmoTime={elmoEffectTime}
                elmoActive={elmoCollision}
              />
              {elmos.map((e) => (
                <Elmo key={e.id} id={e.id} left={e.left} onClick={onElmoClick} />
              ))}
            </>
          ) : (
            <HomeScreen text={gameOverText} timer={gameTimer} onClick={onStartGame}/>
          )}
        </div>
      );
    };

export default CookieClicker;