export default jest.fn(() => ({
    collection: jest.fn(() => ({
        doc: jest.fn(() => ({
            collection: jest.fn(() => ({
            get: jest.fn(() => ({
                forEach: jest.fn(callback => {
                // Mock some sample data for testing
                callback({ data: () => ({ rating: 4 }) });
                callback({ data: () => ({ rating: 5 }) });
                }),
            })),
            })),
        })),
    })),
}));