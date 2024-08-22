// copy-paste to browser console

let buttonId;
let lastBtnClickTs = Date.now();

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
  const delButton = [...document.querySelectorAll('.group_u_action')].find((el) => el.textContent.includes('Удалить'));
  if (delButton) {
    const onclickAttr = delButton.getAttribute('onclick');
    buttonId = extractIdentifier(onclickAttr);
    delButton.scrollIntoView({ behavior: 'smooth', block: 'center' });
    await new Promise((resolve) => setTimeout(resolve, 400));
    delButton.click();
    console.log('Clicked the shit out of that button');

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

  const tsDiff = Date.now() - lastBtnClickTs;
  const waitMsRNG = Math.floor(Math.random() * (1300 - 700 + 1)) + 700; // from 0.7 to 1.3 seconds
  const wait = Math.max(waitMsRNG - tsDiff, 0);

  await new Promise((resolve) => setTimeout(resolve, wait));
  lastBtnClickTs = Date.now();
  byeByeSubs();
}

byeByeSubs();
