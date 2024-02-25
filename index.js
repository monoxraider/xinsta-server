const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser'); // Import body-parser

const igdl = require('@sasmeee/igdl');

const app = express();
const port = 3001;

app.use(cors());
app.use(bodyParser.json()); // Parse JSON bodies

app.post('/download', async (req, res) => {
  try {
    const { url } = req.body; // Now req.body should be properly parsed
    if (!url) {
      return res.status(400).json({ error: 'Instagram URL is required' });
    }

    const dataList = await igdl(url);

    res.json(dataList);
  } catch (error) {
    console.error('Error:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
