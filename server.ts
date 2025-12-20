import express from 'express';
import { spawn } from 'child_process';
import cors from 'cors';

const app = express();
app.use(cors());
app.use(express.json());

app.get('/health', (_, res) => {
  res.json({ status: 'ok' });
});

app.post('/api/tests/run', (req, res) => {
  const { testFile } = req.body;

  const pw = spawn(
    'npx',
    ['playwright', 'test', testFile],
    {
      shell: true,
      env: {
        ...process.env, // ❗ důležité – žádný debug
      },
    }
  );

  pw.stdout.on('data', d => console.log(d.toString()));
  pw.stderr.on('data', d => console.error(d.toString()));

  res.json({ status: 'started' });
});

app.listen(3000, () => {
  console.log('Backend running on http://localhost:3000');
});
