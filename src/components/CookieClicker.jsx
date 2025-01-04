import React from "react";
import Cookie from "./Cookie";
import Scoreboard from "./Scoreboard";
import { useState, useEffect } from "react";
import Shop from "./Shop";
import Shield from "./Shield";
import Elmo from "./Elmo";

function CookieClicker(){
    const levelAmount = 5;
    const [score, setScore] = useState(999);
    const [helper, setHelper] = useState(0);
    const [level, setLevel] = useState(1);
    const [helperLevel, setHelperLevel] = useState(2);
    const [potion, setPotion] = useState(1);
    const [shieldActive, setShieldActive] = useState(false);
    const [shieldTime, setShieldTime] = useState(0);
    const [elmos, setElmos] = useState([]);
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
            setScore(0);
        } else if (score >= 1000 - (1 * helperLevel * helper * potion) && level === levelAmount){
            alert("Congratulations!!");
            setScore(0);
            setHelper(0);
            setLevel(1);
            enableShopItem("Helper", "+");
            enableShopItem("Helper", "⬆");
        }
        
    }

    // function numberOfElmos(lvl){
    //     return Math.floor(Math.random() * lvl) + 1;
    // }
   
    // useEffect(() => {
    //     const elmoData = Array.from({ length: 5 }, (_, index) => ({
    //       id: `elmo${index + 1}`, 
    //       left: `${Math.floor(Math.random() * 81) + 10}%`,
    //       isAtCore: false,
    //     }));
    
    //     setElmos(elmoData);
    //   }, []);
    
    function calculateElmoStart(){
        const elmoElements = document.querySelectorAll('.elmo');
        elmoElements.forEach((elmo) => {
          const rect = elmo.getBoundingClientRect();
          const startX = rect.left;
          elmo.style.setProperty('--elmo-start-x', `${startX}px`);
          console.log(startX);
        });
      }; // This effect runs whenever `elmos` changes

    function createElmoArray(){
        const elmoData = Array.from({ length: 5 }, (_, index) => ({
            id: `elmo${index + 1}`,
            left: `${Math.floor(Math.random() * 81) + 10}%`,
            isAtCore: false,
          }));
        setElmos(elmoData); 
    }
    
      // Initial Elmo setup when component mounts
      useEffect(() => {
        createElmoArray();
        calculateElmoStart();
      }, []); // This effect runs only on initial mount
    
    function onElmoClick(id){
        setElmos((prev) => {
            const updatedElmos = prev.filter((e) => e.id !== id);
            if (updatedElmos.length === 0) {
              createElmoArray();
              calculateElmoStart();
            }
            return updatedElmos;
          });
        };
    
    





    return <div>
        {shieldActive && <Shield score={score} />}
        <Shop list={shopList}/>
        <Cookie score={score} onCookieClick={onCookieClick}/>
        <Scoreboard score={score} level={level} levelAmount={levelAmount}
                    helpers={helper} potion={potion} potionTime={potionTime}
                    shieldTime={shieldTime} shieldActive={shieldActive}
                    helperLevel={helperLevel}/>
        
        {elmos.map((e, i) => <Elmo key={e.id} id={e.id} left={e.left} onClick={onElmoClick}/>)}
        
        
        
     
    </div>;
}

export default CookieClicker;