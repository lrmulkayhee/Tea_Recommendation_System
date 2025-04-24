class ChatbotService:
    def __init__(self):
        # Initialize any necessary resources or models here
        pass

    def get_response(self, user_message: str) -> str:
        """
        Accepts a user message, processes it, and generates a response.

        :param user_message: The input message from the user.
        :return: A string response.
        """
        user_message = user_message.lower().strip()

        # Example chatbot logic
        if not user_message:
            return "Please provide a valid message."

        if 'green tea' in user_message:
            return "I recommend trying Matcha or Sencha for a great green tea experience!"
        elif 'herbal tea' in user_message:
            return "How about Chamomile or Peppermint tea for a soothing herbal option?"
        elif 'caffeine-free' in user_message:
            return "Rooibos or Hibiscus tea are excellent caffeine-free options!"
        elif 'recommend' in user_message:
            return "Can you tell me more about your preferences? For example, flavor, type, or health benefits."
        else:
            return "I'm not sure, but you can explore our tea collection for more options!"