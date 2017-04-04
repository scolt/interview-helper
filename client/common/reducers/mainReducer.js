export default function main(state = {}, action) {
    if (action.type === 'redirect') {
        setTimeout(() => {
            window.location.hash = action.path;
        });
    }

    return state;
}
