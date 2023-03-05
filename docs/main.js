const repoName = 'mahyarshabani/nm-cleaner';
const apiUrl = `https://api.github.com/repos/${repoName}/releases/latest`;

fetch(apiUrl)
    .then(response => response.json())
    .then(data => {
        const tag = data.tag_name;
        const productName = 'nm-cleaner';
        const version = tag.substring(1);
        const windowsFileName = `${productName}-${version}.portable.windows.exe.zip`;
        const linuxFileName = `${productName}-${version}.linux.AppImage`;
        const windowsDownloadUrl = `https://github.com/${repoName}/releases/download/${tag}/${windowsFileName}`;
        const linuxDownloadUrl = `https://github.com/${repoName}/releases/download/${tag}/${linuxFileName}`;
        const windowsLinkElement = document.getElementById('windows_link');
        const linuxLinkElement = document.getElementById('linux_link');
        windowsLinkElement.href = windowsDownloadUrl;
        linuxLinkElement.href = linuxDownloadUrl;
        document.querySelectorAll('.version').forEach(versionElement => {
            versionElement.textContent = tag
        });
    })
    .catch(error => {
        console.error(`Failed to fetch latest release: ${error}`);
    });
