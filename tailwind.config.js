module.exports = {
    darkMode: 'class',
    future : {
        removeDepreciatedGapUtilities: true
    },
    theme : {
        fill : (theme) => ({
            red : theme('colors.red.primary')
        }),
        colors : {
            white: '#ffffff',
            blue: {
                medium : '#005c98'
            },
            black : {
                light : '#262626',
                faded : '#00000059',
                dark : '#000000'
            },
            gray : {
                base : '#616161',
                background : '#fafafa',
                primary : '#dbdbdb',
                dark : '#191919'
            },
            red : {
                primary : '#ed4956'
            }
        }
    },
    variants : {
        display : ['group-hover']
    }
};