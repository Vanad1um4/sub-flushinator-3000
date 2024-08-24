// copy-paste to browser console

let buttonId;
let tsOfLastClick = Date.now();
let yeetedSubsAmt = 0;

function findButtonByIdentifier(identifier) {
  return [...document.querySelectorAll('.group_u_action')].find(
    (el) => el.getAttribute('onclick') && el.getAttribute('onclick').includes(identifier)
  );
}

function extractIdentifier(str) {
  const lastQuote = str.lastIndexOf("'");
  if (lastQuote !== -1) {
    const secondLastQuote = str.lastIndexOf("'", lastQuote - 1);
    if (secondLastQuote !== -1) {
      return str.substring(secondLastQuote + 1, lastQuote);
    }
  }
  return null;
}

async function byeByeSubs() {
  const kickButton = [...document.querySelectorAll('.group_u_action')].find((el) => el.textContent.includes('Удалить'));
  if (kickButton) {
    const buttonIdAttr = kickButton.getAttribute('onclick');
    buttonId = extractIdentifier(buttonIdAttr);
    kickButton.scrollIntoView({ behavior: 'smooth', block: 'center' });
    await new Promise((resolve) => setTimeout(resolve, 400));
    kickButton.click();
    yeetedSubsAmt++;
    const usersLeft = document.querySelector('.page_block_header_count').textContent.replace(' ', ',');
    console.clear();
    console.log(`🦶=͟͟͞͞🤸 ${yeetedSubsAmt} users yeeted while ${usersLeft} are waiting for their doom 💀`);
    await new Promise((resolve) => {
      const checkRestore = () => {
        const restoreButton = findButtonByIdentifier(buttonId);
        if (restoreButton) {
          if (restoreButton.textContent.includes('Восстановить')) {
            resolve();
          } else {
            setTimeout(checkRestore, 100);
          }
        } else {
          setTimeout(checkRestore, 100);
        }
      };
      checkRestore();
    });
  } else {
    return;
  }
  const msPassedSinceLastClick = Date.now() - tsOfLastClick;
  const msWaitBetweenClicks = Math.floor(Math.random() * (1300 - 700 + 1)) + 700; // from 0.7 to 1.3 seconds
  const msNeedToWait = Math.max(msWaitBetweenClicks - msPassedSinceLastClick, 0); // accounting for the time it took to get kick confirmation
  await new Promise((resolve) => setTimeout(resolve, msNeedToWait));
  tsOfLastClick = Date.now();
  byeByeSubs();
}

byeByeSubs();
