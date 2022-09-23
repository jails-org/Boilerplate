
export default function helloWorld ({ main, state }) {

    main( _ => [
        events
    ])

    const events = ({ on }) => {
        on('click', '[data-add]', add)
        on('click', '[data-subtract]', subtract)
    }

    const add = () => {
        state.set( s => s.counter += 1 )
    }

    const subtract = () => {
        state.set( s => s.counter -= 1 )
    }
}

export const model = {
    counter : 0
}
