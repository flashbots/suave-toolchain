const core = require("@actions/core");
const toolCache = require("@actions/tool-cache");
const path = require("path");
const axios = require("axios");

async function main() {
  try {
    // Get version input
    let version = core.getInput("version");
    if (version == "latest") {
      version = await fetchLatestReleaseTag();
    }

    const download = getDownloadObject(version);
    core.info(`Downloading suave-geth from: ${download.url}`);
    const pathToArchive = await toolCache.downloadTool(download.url);

    // Extract the archive onto host runner
    core.debug(`Extracting ${pathToArchive}`);
    const extract = download.url.endsWith(".zip") ? toolCache.extractZip : toolCache.extractTar;
    const pathToCLI = await extract(pathToArchive);

    // Expose the tool
    core.addPath(path.join(pathToCLI, download.binPath));
  } catch (error) {
    core.setFailed(error.message);
  }
}

async function fetchLatestReleaseTag() {
  const response = await axios.get("https://api.github.com/repos/flashbots/suave-geth/releases/latest");

  const tagName = response.data.tag_name;
  return tagName;
}

function getDownloadObject(version) {
  const url = `https://github.com/flashbots/suave-geth/releases/download/${version}/suave-geth_${version}_linux_amd64.zip`;

  return {
    url,
    binPath: ".",
  };
}

module.exports = main;

if (require.main === module) {
  main();
}
