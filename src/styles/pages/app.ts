import { styled } from "..";


export const Container = styled('div', {
    display: 'flex',
    flexDirection: 'column',
    // justifyContent: 'center',
    alignItems: "center",
    minHeight: '100vh',
})

export const HeaderContainer = styled('header', {
    display: 'flex',
    flexdirection: 'column',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: '2rem 0',
    width: '100%',
    maxWidth: 1180,
    margin: '0 auto',
});

export const HeaderCart = styled('div', {
    display: 'flex',

    padding: '0.75rem',
    borderRadius: 8,
    color: '$white',
    backgroundColor: '$gray800',

    cursor: 'pointer',

    "&:hover": {
        backgroundColor: '$gray700',
    },

    span: {
        marginLeft: '0.5rem',
    }
})