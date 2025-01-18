class Tea:
    def __init__(self, name, tea_type, flavor, origin):
        self.name = name
        self.tea_type = tea_type
        self.flavor = flavor
        self.origin = origin

    def __repr__(self):
        return f"Tea(name={self.name}, type={self.tea_type}, flavor={self.flavor}, origin={self.origin})"