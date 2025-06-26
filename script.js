function formatDate(date) {
  const day = String(date.getDate()).padStart(2, "0");
  const month = String(date.getMonth() + 1).padStart(2, "0");
  const year = date.getFullYear();
  return `${day}/${month}/${year}`;
}

function getRandomMessage(age, gender) {
  const generic = [
    `You've lived over ${age * 365} days — time flies!`,
    `That’s ${age * 52} weeks of life wisdom!`,
    `Age is just a number... but ${age} is a cool one.`,
    `You're not getting older, you're leveling up! 💪`
  ];

  const male = [
    `Sir, you've earned ${age} years of excellence. 👑`,
    `Dude, you're ${age}? That's prime legend status. 🤘`
  ];

  const female = [
    `Ma'am, you shine brighter every year ✨ — ${age} and fabulous!`,
    `Goddess vibes at age ${age} 💃🔥`
  ];

  const other = [
    `A brilliant soul at ${age} — keep being you 🌈`,
    `${age} years of uniqueness and counting 💫`
  ];

  if (gender === "male") return male[Math.floor(Math.random() * male.length)];
  if (gender === "female") return female[Math.floor(Math.random() * female.length)];
  if (gender === "other") return other[Math.floor(Math.random() * other.length)];
  return generic[Math.floor(Math.random() * generic.length)];
}

function calculateAge() {
  const name = document.getElementById("username").value.trim();
  const gender = document.getElementById("gender").value;
  const birthdateInput = document.getElementById("birthdate").value;
  const result = document.getElementById("result");
  const countdown = document.getElementById("countdown");

  if (!birthdateInput) {
    result.innerHTML = `<span style="color: red;">Please select your birthdate!</span>`;
    countdown.innerHTML = '';
    return;
  }

  const birthDate = new Date(birthdateInput);
  const today = new Date();

  let years = today.getFullYear() - birthDate.getFullYear();
  let months = today.getMonth() - birthDate.getMonth();
  let days = today.getDate() - birthDate.getDate();

  if (months < 0 || (months === 0 && days < 0)) {
    years--;
    months += 12;
  }

  if (days < 0) {
    const prevMonth = new Date(today.getFullYear(), today.getMonth(), 0);
    days += prevMonth.getDate();
    months--;
    if (months < 0) {
      months += 12;
      years--;
    }
  }

  const personalityMsg = getRandomMessage(years, gender);
  const displayName = name ? `<strong>${name}</strong>, ` : "";

  result.innerHTML = `
    <p>${displayName}you are <strong>${years}</strong> years, <strong>${months}</strong> months, and <strong>${days}</strong> days old.</p>
    <p style="font-style: italic; margin-top: 10px;">${personalityMsg}</p>
  `;

  const nextBirthday = new Date(today.getFullYear(), birthDate.getMonth(), birthDate.getDate());
  if (nextBirthday < today) {
    nextBirthday.setFullYear(today.getFullYear() + 1);
  }
  const diff = nextBirthday - today;
  const daysLeft = Math.floor(diff / (1000 * 60 * 60 * 24));
  countdown.innerHTML = `🎉 Your next birthday is in <strong>${daysLeft}</strong> day${daysLeft !== 1 ? 's' : ''}!`;
}

function toggleTheme() {
  const body = document.body;
  const label = document.getElementById("themeLabel");
  const isDark = body.classList.toggle("dark");
  label.textContent = isDark ? "🌙 Dark Mode" : "☀️ Light Mode";
}

