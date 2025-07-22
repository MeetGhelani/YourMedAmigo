import { GoogleGenerativeAI } from "@google/generative-ai";

const home_container = document.getElementById("home_container");
var clutter = "";

document
  .getElementById("submitButton")
  .addEventListener("click", function (event) {
    event.preventDefault(); // Prevent the form from submitting (if it's in a form)

    async function run() {
      clutter = "";
      home_container.innerHTML = `            <div class="cardz">
                <div class="description">
                    <div class="line line-1"></div>
                    <div class="line line-2"></div>
                    <div class="line line-3"></div>
                  </div>
              </div>`;

      var inputText = document.getElementById("question").value;
      // Access your API key (see "Set up your API key" above)
      const genAI = new GoogleGenerativeAI(
        "AIzaSyBP1raBQR7KDfDnb0mcmBMHbm9ZHqEDAZ4"
      );

      // For text-only input, use the gemini-pro model
      const model = genAI.getGenerativeModel({ model: "gemini-pro" });
      /*
                    const prompt = "Act as a doctor, i have fever and cough which medicines would you recommend immediatly? as i am from indiq suggest some popular ones so the medical stores have it. in 6-7 lines answer me"
                    */

      const prompt = `Act as a doctor answer the questions with these details - "Please provide the current information for the medicine in a bullet points. The table should include the following columns:

      Name
      Dosage
      Usage
      Side Effects
      Manufacturer
      Price(from India, Recommend some brand with its parice)
      Availability". If its not medicine info then understand the statement and respond that you require medicine info. And if The Question is regarding greetings then please greet them. The Question is - "${inputText}"`;

      const result = await model.generateContent(prompt);
      const response = await result.response;
      const text = response.text();

      function formatResponse(txt) {
        // Replace double asterisks with <strong> tags for bold formatting
        const formattedResponse = txt.replace(
          /\*\*(.*?)\*\*/g,
          "<strong>$1</strong>"
        );
        // Replace new lines with <br> tags
        const finalResponse = formattedResponse.replace(/\n/g, "<br>");
        return finalResponse;
      }

      // Display the formatted response
      const text2 = formatResponse(text);

      clutter += `

                        <div class="person">
                            <div class="person-details">
                                <div class="person-txt">
                                    <p>
                                        <i class="ri-robot-3-fill text-white"></i> : ${text2}
                                    </p>
                                </div>
                            </div>
                        </div>
                        `;
      home_container.innerHTML = clutter;
      console.log(text2);
      console.log(clutter);
    }

    run();
  });
