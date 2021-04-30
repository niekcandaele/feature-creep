import { server } from '../graphql';
import { createPerson } from './util';

(async () => {
  //await loadData();

  server.listen().then((data: any) => {
    console.log(`🚀  Server ready at ${data.url}`);
  });
})();

export async function loadData() {
  const harry = await createPerson('harry');
  const ron = await createPerson('ron');

  console.log(`Harry: ${harry.id}`);
  console.log(`Ron: ${ron.id}`);
  return {
    harry,
    ron,
  };
}
