app.post('/api/tests/run', (req, res) => {
  const { testFile } = req.body;

  const pw = spawn(
    'npx',
    ['playwright', 'test', testFile],
    {
      shell: true,
      env: {
        ...process.env (important!)
      },
    }
  );

  pw.stdout.on('data', d => console.log(d.toString()));
  pw.stderr.on('data', d => console.error(d.toString()));

  res.json({ status: 'started' });
});
