
const feelings = [
    { id: 1, emote: '(╥﹏╥)' },
    { id: 2, emote: '(ಥ﹏ಥ)' },
    { id: 3, emote: '(｡•́︿•̀｡)' },
    { id: 4, emote: '(・_・;)' },
    { id: 5, emote: '(＾‿＾)' },
    { id: 6, emote: '(｡ᵕᴗᵕ｡)' },
    { id: 7, emote: '(๑>◡<๑)' },
    { id: 8, emote: '(๑˃́ꇴ˂̀๑)/' },
    { id: 9, emote: '(｡♥ ³♥｡)' },
    { id: 10, emote: '(ﾉ◕ヮ◕)ﾉ･ﾟ✧' },
]

const sleeps = [
    { id: 1, emote: '(￣□￣;)!!' },
    { id: 2, emote: '(◎_◎;)' },
    { id: 3, emote: '(=_=)' },
    { id: 4, emote: '(-_-)' },
    { id: 5, emote: '( -.-)Z' },
    { id: 6, emote: '( -_-)Zz' },
    { id: 7, emote: '( ~.~)Zzz' },
    { id: 8, emote: '( -‿-)💤' },
    { id: 9, emote: '(๑˘︶˘๑)✧🌙' },
    { id: 10, emote: '( ˘ ³˘)♡💤' },
];

const selfcares = [
    { id: 1, emote: '(×_×;)' },
    { id: 2, emote: '(;¬_¬)' },
    { id: 3, emote: '(¬_¬")' },
    { id: 4, emote: '(・_・)' },
    { id: 5, emote: '(＾_＾)' },
    { id: 6, emote: '(｡•ᴗ•｡)' },
    { id: 7, emote: '(＾▽＾)🧴' },
    { id: 8, emote: '(｡•̀ᴗ-)✧🛁' },
    { id: 9, emote: '(๑˃ᴗ˂)ﻭ ✨' },
    { id: 10, emote: '(˘ᵕ˘)🌿✨' },
];

const metricConfig = {
    'feeling' : {
        name: 'feeling',
        prompt: 'how do u feel?',
        emoji: '🙂',
        array: feelings,
        color: 'rgb(205, 135, 141)',
    },
    'sleep' : {
        name: 'sleep',
        prompt: 'how was ur sleep?',
        emoji: '💤',
        array: sleeps,
        color: 'rgb(135, 194, 205)',
    },
    'selfcare' : {
        name: 'selfcare',
        prompt: 'selfcare, hygiene, routines?',
        emoji: '🛀',
        array: selfcares,
        color: 'rgb(135, 205, 147)',
    },
}

export { metricConfig };