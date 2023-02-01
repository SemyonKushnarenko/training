const turnIterator = array => {
    let index = 0;

    return () => {
        const value = array[index];
        if (index < array.length - 1) {
            index++;
        } else {
            index = 0;
        }

        return value;
    };
};

export default turnIterator;