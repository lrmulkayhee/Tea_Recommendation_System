class ChatbotService:
    def get_response(self, user_message):
        user_message = user_message.lower().strip()

        if 'green tea' in user_message:
            return "I recommend trying Matcha or Sencha for a great green tea experience!"
        elif 'herbal tea' in user_message:
            return "How about Chamomile or Peppermint tea for a soothing herbal option?"
        else:
            return "I'm not sure, but you can explore our tea collection for more options!"