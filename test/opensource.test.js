const { opensource } = require('../commands');

const bot = {
  command: jest.fn(),
};

test('Replies with the repository message', () => {
  opensource(bot);

  expect(bot.command).toHaveBeenCalled();
});
