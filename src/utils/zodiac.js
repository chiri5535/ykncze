export const getZodiacSign = (month, day) => {
  const signs = [
    { 
      name: '山羊座', 
      start: [12, 22], 
      end: [1, 19], 
      lucky: '信頼と格を高めるディープネイビー',
      image: 'http://zeny.deci.jp/page/images/seiza/01yagi.png'
    },
    { 
      name: '水瓶座', 
      start: [1, 20], 
      end: [2, 18], 
      lucky: '発想力と未来志向を刺激するエレクトリックブルー',
      image: 'http://zeny.deci.jp/page/images/seiza/02mizugame.png'
    },
    { 
      name: '魚座', 
      start: [2, 19], 
      end: [3, 20], 
      lucky: '直感と癒しを強めるアクアマリン',
      image: 'http://zeny.deci.jp/page/images/seiza/03uo.png'
    },
    { 
      name: '牡羊座', 
      start: [3, 21], 
      end: [4, 19], 
      lucky: '情熱と行動力を後押しするクリムゾンレッド',
      image: 'http://zeny.deci.jp/page/images/seiza/04ohitsuji.png'
    },
    { 
      name: '牡牛座', 
      start: [4, 20], 
      end: [5, 20], 
      lucky: '安心感と豊かさを育てるモスグリーン',
      image: 'http://zeny.deci.jp/page/images/seiza/05oushi.png'
    },
    { 
      name: '双子座', 
      start: [5, 21], 
      end: [6, 20], 
      lucky: '知性と軽やかさを引き出すペールイエロー',
      image: 'http://zeny.deci.jp/page/images/seiza/06futago.png'
    },
    { 
      name: '蟹座', 
      start: [6, 21], 
      end: [7, 22], 
      lucky: '心を守り感情を整えるミルキーホワイト',
      image: 'http://zeny.deci.jp/page/images/seiza/07kani.png'
    },
    { 
      name: '獅子座', 
      start: [7, 23], 
      end: [8, 22], 
      lucky: '自己肯定感を高めるウォームゴールド',
      image: 'http://zeny.deci.jp/page/images/seiza/08shishi.png'
    },
    { 
      name: '乙女座', 
      start: [8, 23], 
      end: [9, 22], 
      lucky: '思考をクリアにするセージグリーン',
      image: 'http://zeny.deci.jp/page/images/seiza/09otome.png'
    },
    { 
      name: '天秤座', 
      start: [9, 23], 
      end: [10, 22], 
      lucky: '人間関係を円滑にするダスティーピンク',
      image: 'http://zeny.deci.jp/page/images/seiza/10tenbin.png'
    },
    { 
      name: '蠍座', 
      start: [10, 23], 
      end: [11, 21], 
      lucky: '内なる力を目覚めさせるディープボルドー',
      image: 'http://zeny.deci.jp/page/images/seiza/11sasori.png'
    },
    { 
      name: '射手座', 
      start: [11, 22], 
      end: [12, 21], 
      lucky: '視野を広げ可能性を引き出すロイヤルパープル',
      image: 'http://zeny.deci.jp/page/images/seiza/12ite.png'
    }
  ];

  for (let sign of signs) {
    if (
      (month === sign.start[0] && day >= sign.start[1]) ||
      (month === sign.end[0] && day <= sign.end[1])
    ) {
      return sign;
    }
  }
  return { name: '不明', lucky: '不明', image: '' };
};
