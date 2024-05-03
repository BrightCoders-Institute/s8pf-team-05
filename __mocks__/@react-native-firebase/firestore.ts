export default jest.fn(() => ({
  collection: jest.fn(() => ({
    doc: jest.fn(() => ({
      get: jest.fn(() => ({
        data: () => ({ /* Simulate Firestore document data */ }),
      })),
    })),
  })),
}));
