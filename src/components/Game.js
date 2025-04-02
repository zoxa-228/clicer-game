import React, { useState, useEffect } from 'react';

const Game = () => {
  const [coins, setCoins] = useState(0); // Количество монет
  const [clickPower, setClickPower] = useState(1); // Сила клика
  const [autoMining, setAutoMining] = useState(0); // Сила автодобычи
  const [upgrades, setUpgrades] = useState({
    clickUpgrade: 10, // Стоимость улучшения клика
    autoUpgrade: 20, // Стоимость улучшения автодобычи
    environmentUpgrade: 100, // Стоимость улучшения окружения
  });
  const [autoMiningInterval, setAutoMiningInterval] = useState(null); // Интервал автодобычи
  const [environment, setEnvironment] = useState([]); // Массив для улучшений окружения
  const [isModalOpen, setIsModalOpen] = useState(false); // Статус модального окна

  // Добыча монеты
  const mineCoin = () => {
    setCoins(coins + clickPower);
  };

  // Автодобыча монет
  const startAutoMining = () => {
    if (autoMiningInterval) clearInterval(autoMiningInterval); // Очищаем старый интервал
    const newInterval = setInterval(() => {
      setCoins(prevCoins => prevCoins + 2); // Каждую секунду добавляем 2 монеты
    }, 1000);
    setAutoMiningInterval(newInterval); // Сохраняем интервал
  };

  // Закрытие модального окна
  const closeModal = () => {
    setIsModalOpen(false);
  };

  // Открытие модального окна
  const openModal = () => {
    setIsModalOpen(true);
  };

  // Покупка улучшения для клика
  const upgradeClick = () => {
    if (coins >= upgrades.clickUpgrade) {
      setCoins(coins - upgrades.clickUpgrade);
      setClickPower(clickPower + 1);
      setUpgrades(prev => ({
        ...prev,
        clickUpgrade: Math.floor(prev.clickUpgrade * 1.5),
      }));
    }
  };

  // Покупка улучшения для автодобычи
  const upgradeAutoMining = () => {
    if (coins >= upgrades.autoUpgrade) {
      setCoins(coins - upgrades.autoUpgrade);
      setAutoMining(autoMining + 2); // Увеличиваем автодобычу на 2 монеты в секунду
      startAutoMining(); // Запускаем автодобычу
      setUpgrades(prev => ({
        ...prev,
        autoUpgrade: Math.floor(prev.autoUpgrade * 1.5),
      }));
    }
  };

  // Покупка улучшения окружения
  const upgradeEnvironment = () => {
    if (coins >= upgrades.environmentUpgrade) {
      setCoins(coins - upgrades.environmentUpgrade);
      setEnvironment(prev => [
        ...prev,
        'forest', // Например, добавляем лес
      ]);
      setUpgrades(prev => ({
        ...prev,
        environmentUpgrade: Math.floor(prev.environmentUpgrade * 1.5),
      }));
    }
  };

  useEffect(() => {
    return () => {
      if (autoMiningInterval) clearInterval(autoMiningInterval); // Очищаем интервал при размонтировании
    };
  }, [autoMiningInterval]);

  return (
    <div style={styles.container}>
      <div style={styles.coinsDisplay}>
        <span>Монеты: {coins}</span>
        <br />
        {autoMining > 0 && ( // Отображаем текст автодобычи только если она активирована
          <span>Автодобыча: +2 монеты в секунду</span>
        )}
      </div>

      <button style={styles.mineButton} onClick={mineCoin}>
        Добыть
      </button>

      <button style={styles.upgradeButton} onClick={openModal}>
        Улучшения
      </button>

      {isModalOpen && (
        <div style={styles.modal}>
          <button style={styles.closeButton} onClick={closeModal}>
            Закрыть
          </button>
          <div>
            <button onClick={upgradeClick}>Улучшить клик ({upgrades.clickUpgrade} монет)</button>
            <button onClick={upgradeAutoMining}>Улучшить автодобычу ({upgrades.autoUpgrade} монет)</button>
            <button onClick={upgradeEnvironment}>Улучшить окружение ({upgrades.environmentUpgrade} монет)</button>
          </div>
        </div>
      )}

      <div style={styles.environmentContainer}>
        {environment.includes('forest') && <img src="/images/forest.png" alt="Лес" style={styles.environmentImage} />}
        {environment.includes('mountains') && <img src="/images/mountains.png" alt="Горы" style={styles.environmentImage} />}
        {environment.includes('river') && <img src="/images/river.png" alt="Река" style={styles.environmentImage} />}
        {environment.includes('city') && <img src="/images/city.png" alt="Город" style={styles.environmentImage} />}
        {environment.includes('sun') && <img src="/images/sun.png" alt="Солнце" style={styles.environmentImage} />}
      </div>
    </div>
  );
};

const styles = {
  container: {
    textAlign: 'center',
    padding: '20px',
  },
  coinsDisplay: {
    marginBottom: '20px',
    fontSize: '24px',
  },
  mineButton: {
    fontSize: '20px',
    padding: '15px',
    backgroundColor: '#4CAF50',
    color: 'white',
    border: 'none',
    borderRadius: '5px',
    cursor: 'pointer',
  },
  upgradeButton: {
    fontSize: '20px',
    padding: '15px',
    backgroundColor: '#007bff',
    color: 'white',
    border: 'none',
    borderRadius: '5px',
    cursor: 'pointer',
    marginLeft: '20px',
  },
  modal: {
    position: 'absolute',
    top: '0',
    left: '0',
    width: '100%',
    height: '100%',
    backgroundColor: 'rgba(0, 0, 0, 0.7)',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    flexDirection: 'column',
    color: 'white',
  },
  closeButton: {
    position: 'absolute',
    top: '20px',
    right: '20px',
    fontSize: '24px',
    color: 'white',
    backgroundColor: 'transparent',
    border: 'none',
    cursor: 'pointer',
  },
  environmentContainer: {
    marginTop: '20px',
    display: 'flex',
    justifyContent: 'center',
    flexWrap: 'wrap',
  },
  environmentImage: {
    width: '100px',
    height: '100px',
    margin: '10px',
  },
};

export default Game;
