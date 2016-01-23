var mongoose = require('mongoose');
mongoose.connect(process.env.MONGOLAB_URI);

var PointSchema = new mongoose.Schema({
    _id: mongoose.Schema.ObjectId,
    loc: {
        type: { type: String },
        coordinates: { type: [Number] }
    }
}, { collection: "points" });

PointSchema.index({ loc: "2dsphere" });
mongoose.model("Point", PointSchema);

var geoJsonPoly = {
        type: "Polygon",
        coordinates: [
            [
                [8.594874265234353, 49.33654935186479],
                [8.594874265234353, 49.322858939564284],
                [8.553675534765603, 49.322858939564284],
                [8.553675534765603, 49.33654935186479],
                [8.594874265234353, 49.33654935186479]
            ]
        ]
    };

var Point = mongoose.model("Point");
var MyPoint = new Point({_id: mongoose.Types.ObjectId(),loc:{type:'Point',coordinates:[8.594874265234353, 49.33654935186479]}})
MyPoint.save(function(){
  console.log(arguments)
})
var pointFields = { '_id': 1, 'loc': 1 };
Point.find({}).where('loc').within(geoJsonPoly).select(pointFields).lean().exec(function (error, result) {
    console.log("Error: " + error);
    console.log(result);
});