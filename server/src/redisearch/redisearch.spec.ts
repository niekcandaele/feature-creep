import chai from 'chai';
import sinon from 'sinon';
import sinonChai from 'sinon-chai';

import { clearDb } from '../rejson/db';
import { defaultQuestions, RediSearch } from './client';

chai.use(sinonChai);
const expect = chai.expect;

describe('Redisearch', () => {
  let redissearch: RediSearch;

  beforeEach(async () => {
    await clearDb();
    redissearch = new RediSearch();
    await redissearch.init();
  });

  it('Can add a question', async () => {
    const preStats = await redissearch.getIndexStats();
    expect(preStats.totalDocs).to.be.equal(8);

    await redissearch.addQuestion({
      question: 'What is the answer to life, the universe and everything?',
      descriptionBad: 'bad!',
      descriptionGood: 'good!',
    });
    const afterStats = await redissearch.getIndexStats();
    expect(afterStats.totalDocs).to.be.equal(9);
  });

  it('Does not add duplicate questions', async () => {
    const preStats = await redissearch.getIndexStats();
    expect(preStats.totalDocs).to.be.equal(8);

    await redissearch.addQuestion(defaultQuestions[0]);
    const afterStats = await redissearch.getIndexStats();
    expect(afterStats.totalDocs).to.be.equal(8);
  });

  it('Can search', async () => {
    const res = await redissearch.search('Fun', {});
    expect(res).to.have.length(1);
  });

  it('Can search multiple words', async () => {
    const res = await redissearch.search('Fun codebase', {});
    expect(res).to.have.length(2);
  });

  it('Can find questions based on descriptions', async () => {
    const res = await redissearch.search('Boooooooring', { onlyTitle: false });
    expect(res).to.have.length(1);
  });

  it('Only initializes once', async () => {
    // @ts-expect-error accessing private method
    const spy = sinon.spy(RediSearch.prototype, 'createIndex');

    await redissearch.init();

    expect(spy).to.not.have.been.called;
  });
});
