import sample_pb2

searchreq = sample_pb2.SearchRequest()
searchreq.query = "John"
searchreq.page_number = 1
searchreq.results_per_page = 22

# Serialize the person object to a byte string
serialized_searchreq = searchreq.SerializeToString()

# Deserialize the byte string back to a person object
deserialized_searchreq = sample_pb2.SearchRequest()
deserialized_searchreq.ParseFromString(serialized_searchreq)

print(deserialized_searchreq)
