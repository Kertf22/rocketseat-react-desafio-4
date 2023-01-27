import { styled } from "@stitches/react"

export const CartContainer = styled('div', {

    width: '100%',
    maxWidth: 560,

    display: 'flex',
    flexDirection: 'column',
    padding: '1rem',


    h2: {
        fontSize: '1.5rem',
        color: '$gray300',
        marginBottom: '1rem'
    },

    button: {
        marginTop: 'auto',
        backgroundColor: '$green500',
        border: 0,
        color: '$white',
        borderRadius: 8,
        padding: '1.25rem',
        curso: 'pointer',
        fontSize: '$md',
        cursor: 'pointer',


        '&:hover': {
            backgroundColor: '$green300'
        },

        '&:disabled': {
            opacity: 0.6,
            cursor: 'not-allowed'
        }
    }
})

export const CartItems = styled('div', {
    width: '100%',
    display: 'flex',
    flexDirection: 'column',
    gap: '1rem',
    padding: '1rem',

})

export const CartItem = styled('div', {
    width: 256,
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    gap: '1rem',
})

export const CartImageContainer = styled('div', {
    width: "100%",
    maxWidth: 85,
    height: 80,
    background: 'linear-gradient(180deg, #1ea483 0%, #7465d4 100%)',
    borderRadius: 8,
    padding: '0.25rem',
    display: "flex",
    flexDirection: "column",
    alignItems: "center",

    img: {
        objectFit: "cover"
    }
});

export const CartItemInfo = styled('div', {
    padding: '0.5rem',

    h4: {
        fontSize: '1rem',
        color: '$gray300',
        fontWeight: 400,
        marginBottom: '0.5rem'
    }
})

export const CartItemQuantity = styled('div', {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '$gray100',
    borderRadius: 6,
    justifyContent: 'center',
    gap: '0.5rem',
    cursor: 'pointer',
    span: {
        fontSize: '1.2rem',
        color: '$gray800',

        '&:hover': {
            color: '$gray300',
        },
    }
})

export const CartDetails = styled('div', {

    display: 'flex',
    flexDirection: 'column',
    alignItems: 'start',    
    padding: '1rem',
    marginBottom: '1rem',    
    backgroundColor: '$gray800',

    borderRadius: 8,

    h4: {
        fontSize: '1.2rem',
        color: '$gray300',
        textTransform: 'uppercase',
        textAlign: 'center',
    }

})

export const CartPrice = styled('div', {

    marginBottom: '0.35rem',

    span: {
        fontSize: '1.2rem',
        color: '$gray300',
        fontWeight: 400,
        marginRight: '0.5rem'
    }

})


export const Button = styled('button', {})